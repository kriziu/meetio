import { toast } from 'react-toastify';

export const promiseToast = (
  promise: Promise<any>,
  pending: string,
  success: string
) => toast.promise(promise, { pending, success, error: 'Error!' });

export const errToast = (msg: string) =>
  toast.error(msg, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const successToast = (msg: string) =>
  toast.success(msg, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
