/* tslint:disable:interface-name no-internal-module no-namespace */
declare module NodeJS  {
  interface Global {
    isRuntimeEnabled: boolean;
    __container: any; // <-- do not USE!;
  }
}

interface Window {
  picturefillCFG: string[][];
  MSInputMethodContext: any;
}
