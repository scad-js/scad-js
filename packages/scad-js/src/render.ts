import { createOpenSCAD } from 'openscad-wasm';
import type { ScadObject, ScadSpecialVariables } from './types';

let openscadInstance: any = null;

const getOpenSCADInstance = async () => {
  if (!openscadInstance) {
    openscadInstance = await createOpenSCAD().then((instance) => instance.getInstance());
  }
  return openscadInstance;
};

async function render(this: ScadObject, vars: ScadSpecialVariables & Record<string, any> = {}): Promise<string> {
  const openscadCode = this.serialize(vars);

  const openscad = await getOpenSCADInstance();

  openscad.FS.writeFile('/input.scad', openscadCode);
  openscad.callMain(['/input.scad', '-o', 'output.stl']);
  const result = openscad.FS.readFile('/output.stl', { encoding: 'utf8' });

  openscad.FS.unlink('/input.scad');
  openscad.FS.unlink('/output.stl');

  return result;
}

export default render;
