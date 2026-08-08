import os
import math
import numpy as np
import cv2

def create_hero_animation(
    output_path="tradecode_hero_animation_60fps.mp4",
    width=1920,
    height=1080,
    fps=60,
    duration_sec=6
):
    total_frames = fps * duration_sec
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    print(f"Generating Fast 60 FPS video at {width}x{height}...")

    # 3D icosahedron vertices
    phi = (1.0 + math.sqrt(5.0)) / 2.0
    base_verts = np.array([
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ], dtype=np.float32)

    # Normalize outer and inner nodes
    outer_nodes = base_verts / np.linalg.norm(base_verts, axis=1, keepdims=True) * 280.0
    inner_nodes = base_verts / np.linalg.norm(base_verts, axis=1, keepdims=True) * 150.0
    all_nodes = np.vstack([outer_nodes, inner_nodes]) # 24 nodes
    num_nodes = len(all_nodes)

    # Orbiting particles (24 particles)
    np.random.seed(42)
    particle_r = np.random.uniform(220, 380, 24)
    particle_tilt_x = np.random.uniform(-0.5, 0.5, 24)
    particle_tilt_y = np.random.uniform(-0.5, 0.5, 24)
    particle_phase = np.random.uniform(0, 2 * math.pi, 24)
    particle_speed = np.random.choice([1.0, -1.0], 24) * np.random.uniform(0.8, 1.4, 24)
    particle_size = np.random.uniform(5, 9, 24)

    center_x, center_y = width // 2, height // 2

    # Pre-build background canvas (clean off-white #FAFAFF)
    bg_base = np.full((height, width, 3), (255, 250, 250), dtype=np.uint8) # BGR (255,250,250)

    for frame_idx in range(total_frames):
        t_norm = frame_idx / total_frames # 0.0 to 1.0 (seamless loop)
        angle_rad = t_norm * 2.0 * math.pi

        # Copy base frame
        img = bg_base.copy()

        # 1. Ambient Radial Glow (Violet + Amber blur overlay)
        glow_layer = np.zeros((height, width, 3), dtype=np.uint8)
        pulse1 = (math.sin(angle_rad * 2) + 1.0) / 2.0
        v_r = int(320 + pulse1 * 40)
        cv2.circle(glow_layer, (center_x, center_y), v_r, (237, 58, 124), -1) # BGR Violet (124,58,237)

        a_r = int(230 + (1.0 - pulse1) * 30)
        cv2.circle(glow_layer, (center_x + 40, center_y - 20), a_r, (11, 158, 245), -1) # BGR Amber (245,158,11)

        glow_blurred = cv2.GaussianBlur(glow_layer, (151, 151), 0)
        # Blend ambient glow at ~15% opacity
        img = cv2.addWeighted(img, 1.0, glow_blurred, 0.15, 0)

        # 2. Concentric Quantum Rings
        for ring_i in range(3):
            r_phase = (t_norm + ring_i / 3.0) % 1.0
            r_curr = int(r_phase * 460)
            if r_curr > 10:
                alpha_ring = max(0, 1.0 - r_phase) * 0.4
                color = (int(246 * alpha_ring), int(92 * alpha_ring), int(139 * alpha_ring))
                cv2.circle(img, (center_x, center_y), r_curr, color, 2, cv2.LINE_AA)

        # 3. 3D Rotation matrices
        rot_x = angle_rad
        rot_y = angle_rad * 1.5
        rot_z = math.sin(angle_rad) * 0.3

        cx, sx = math.cos(rot_x), math.sin(rot_x)
        cy, sy = math.cos(rot_y), math.sin(rot_y)
        cz, sz = math.cos(rot_z), math.sin(rot_z)

        Rx = np.array([[1, 0, 0], [0, cx, -sx], [0, sx, cx]], dtype=np.float32)
        Ry = np.array([[cy, 0, sy], [0, 1, 0], [-sy, 0, cy]], dtype=np.float32)
        Rz = np.array([[cz, -sz, 0], [sz, cz, 0], [0, 0, 1]], dtype=np.float32)

        R = Rz @ Rx @ Ry
        rotated_nodes = all_nodes @ R.T

        # Perspective projection
        fov = 700.0
        scales = fov / (fov + rotated_nodes[:, 2] + 300.0)
        proj_x = (center_x + rotated_nodes[:, 0] * scales).astype(np.int32)
        proj_y = (center_y + rotated_nodes[:, 1] * scales).astype(np.int32)

        # 4. Draw Connecting Lines
        for i in range(num_nodes):
            for j in range(i + 1, num_nodes):
                dx = proj_x[i] - proj_x[j]
                dy = proj_y[i] - proj_y[j]
                dist = math.hypot(dx, dy)
                if dist < 260:
                    alpha_line = (1.0 - dist / 260.0) * min(scales[i], scales[j]) * 0.6
                    color = (int(237 * alpha_line), int(58 * alpha_line), int(124 * alpha_line))
                    thickness = max(1, int(2.0 * min(scales[i], scales[j])))
                    cv2.line(img, (proj_x[i], proj_y[i]), (proj_x[j], proj_y[j]), color, thickness, cv2.LINE_AA)

        # 5. Draw 3D Nodes (depth sorted back to front)
        sorted_indices = np.argsort(rotated_nodes[:, 2])
        for idx in sorted_indices:
            px, py, s = proj_x[idx], proj_y[idx], scales[idx]
            n_r = max(3, int(6 * s))

            # Outer node glow
            cv2.circle(img, (px, py), int(n_r * 2.2), (250, 139, 167), -1, cv2.LINE_AA)

            # Node core (Outer: Violet, Inner: Amber)
            if idx < 12:
                n_color = (237, 58, 124) # BGR Violet
            else:
                n_color = (11, 158, 245) # BGR Amber

            cv2.circle(img, (px, py), n_r, n_color, -1, cv2.LINE_AA)

        # 6. Draw Orbiting Particles
        for p_i in range(24):
            p_ang = particle_phase[p_i] + angle_rad * particle_speed[p_i]
            px_r = math.cos(p_ang) * particle_r[p_i]
            py_r = math.sin(p_ang) * particle_r[p_i]

            px = int(center_x + px_r * math.cos(particle_tilt_x[p_i]) - py_r * math.sin(particle_tilt_y[p_i]))
            py = int(center_y + px_r * math.sin(particle_tilt_x[p_i]) + py_r * math.cos(particle_tilt_y[p_i]))
            p_size = int(particle_size[p_i])

            p_color = (237, 58, 124) if p_i % 2 == 0 else (11, 158, 245)
            cv2.circle(img, (px, py), p_size + 3, p_color, -1, cv2.LINE_AA)
            cv2.circle(img, (px, py), p_size, (255, 255, 255), -1, cv2.LINE_AA)

        # 7. Central Tradecode Emblem (Minimal Diamond)
        c_s = int(28 + math.sin(angle_rad * 3) * 4)
        pts = np.array([
            [center_x, center_y - c_s],
            [center_x + c_s, center_y],
            [center_x, center_y + c_s],
            [center_x - c_s, center_y]
        ], np.int32).reshape((-1, 1, 2))

        cv2.fillPoly(img, [pts], (237, 58, 124), cv2.LINE_AA)
        cv2.polylines(img, [pts], True, (11, 158, 245), 2, cv2.LINE_AA)

        out.write(img)

        if (frame_idx + 1) % 60 == 0 or frame_idx == total_frames - 1:
            print(f"Rendered {frame_idx + 1}/{total_frames} frames ({(frame_idx + 1)/total_frames*100:.0f}%)", flush=True)

    out.release()
    print(f"[SUCCESS] Fast Video animation saved to: {os.path.abspath(output_path)}", flush=True)
    return os.path.abspath(output_path)

if __name__ == "__main__":
    create_hero_animation()
