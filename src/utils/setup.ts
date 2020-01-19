import { connect } from 'dva';
import { ConnectState } from '@/models/connect';

export const connect_: {
  <K extends keyof ConnectState>(keys: K[]): (c: any) => any;
  <K extends keyof ConnectState>(...keys: K[]): (c: any) => any;
} = (...args: any[]) => {
  let keys: any[] = args;
  if (args.length === 1 && Array.isArray(args[0])) keys = args[0];
  return connect(
    (state: ConnectState) =>
      keys
        .map(k => ({
          [k]: state[k],
        }))
        .reduce(
          (prev, acc) => ({
            ...prev,
            ...acc,
          }),
          {},
        ),
    {
      next: (type: string, payload: any = {}) => ({
        type,
        payload,
      }),
    },
  );
};
