import * as operations from './operations';
import * as shapes from './shapes';

export * from './operations';
export * from './shapes';

export default { ...shapes, ...operations };
