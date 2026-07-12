import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Box, Cylinder, MeshDistortMaterial } from "@react-three/drei";

function TruckModel() {
  const group = useRef();

  useFrame((state, delta) => {
    // Subtle hover rotation
    group.current.rotation.y += delta * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={group}>
        {/* Cab */}
        <Box args={[1, 1.2, 1]} position={[1, 0.6, 0]}>
          <meshStandardMaterial
            color="#10b981"
            emissive="#059669"
            emissiveIntensity={0.5}
            wireframe
          />
        </Box>
        
        {/* Trailer */}
        <Box args={[2.5, 1.5, 1.2]} position={[-0.8, 0.75, 0]}>
          <MeshDistortMaterial
            color="#3b82f6"
            emissive="#2563eb"
            emissiveIntensity={0.5}
            wireframe
            distort={0.1}
            speed={2}
          />
        </Box>

        {/* Wheels */}
        {[
          [1, 0, 0.6], [1, 0, -0.6],
          [-0.2, 0, 0.6], [-0.2, 0, -0.6],
          [-1.5, 0, 0.6], [-1.5, 0, -0.6]
        ].map((pos, i) => (
          <Cylinder key={i} args={[0.3, 0.3, 0.2, 16]} position={pos} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#0f172a" emissive="#10b981" emissiveIntensity={0.8} wireframe />
          </Cylinder>
        ))}
      </group>
    </Float>
  );
}

export default function AbstractTruck3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <TruckModel />
      </Canvas>
    </div>
  );
}
