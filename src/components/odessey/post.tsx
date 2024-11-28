import {
	Bloom,
	BrightnessContrast,
	ChromaticAberration,
	DepthOfField,
	EffectComposer,
	FXAA,
	Noise,
	ToneMapping,
	Vignette,
} from "@react-three/postprocessing";

export enum ToneMappingMode {
	LINEAR,
	REINHARD,
	REINHARD2,
	REINHARD2_ADAPTIVE,
	UNCHARTED2,
	OPTIMIZED_CINEON,
	CINEON,
	ACES_FILMIC,
	AGX,
	NEUTRAL,
}

const Scene = () => {
	return (
		<EffectComposer>
			<FXAA />
			<Bloom luminanceThreshold={0.1} radius={0.86} mipmapBlur={true} intensity={4} />
			{/* @ts-ignore */}
			<ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
			<ChromaticAberration radialModulation={true} modulationOffset={0} />
			<BrightnessContrast brightness={0.05} contrast={0.3} />
			<DepthOfField focusDistance={0} focalLength={0.02} bokehScale={6} />
			<Noise opacity={0.02} />
			<Vignette eskil={false} offset={0.1} darkness={0.9} />
		</EffectComposer>
	);
};

export default Scene;
