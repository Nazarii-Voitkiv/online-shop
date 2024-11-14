import type { BuilderContext } from '@angular-devkit/architect';
import type { Target } from '@nx/devkit';
export declare function patchBuilderContext(context: BuilderContext, isUsingEsbuildBuilder: boolean, buildTarget: Target): void;
