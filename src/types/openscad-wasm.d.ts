declare module 'openscad-wasm' {
  interface OpenSCADOptions {
    locateFile?: (path: string) => string;
    headless?: boolean;
    gui?: boolean;
    display?: null;
  }

  interface RenderOptions {
    width?: number;
    height?: number;
    camera?: {
      distance: number;
      angle: [number, number, number];
    };
    format?: 'png' | 'stl';
    headless?: boolean;
    gui?: boolean;
    display?: null;
  }

  interface OpenSCADModule {
    default: {
      initialize(options?: OpenSCADOptions): Promise<OpenSCADInstance>;
    };
  }

  interface OpenSCADInstance {
    render(scadCode: string, options?: RenderOptions): Promise<Uint8Array>;
  }

  const OpenSCAD: OpenSCADModule;
  export default OpenSCAD;
}
