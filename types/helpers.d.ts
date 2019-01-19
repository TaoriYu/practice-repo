type Omit<From, What> = Pick<From, Exclude<keyof From, keyof What>>;
type OmitKeys<From, What> = Pick<From, Exclude<keyof From, What>>;
type OmitDif<From, What> = Pick<From, Extract<keyof From, keyof What>>;
