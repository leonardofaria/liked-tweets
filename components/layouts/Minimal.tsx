import { ReactNode } from 'react';

const Minimal = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);

export const getLayout = (page: any) => <Minimal>{page}</Minimal>;

export default Minimal;
