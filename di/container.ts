import { container } from '../core/provider/container';
import * as bindings from './bindings';

for (const key in bindings) if (key in bindings) {
  bindings[key as keyof typeof bindings](container);
}
