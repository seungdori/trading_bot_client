import { invoke } from '@tauri-apps/api/tauri';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

async function startBackend() {
  const response = await invoke('start_server');
  console.log(`[USE START BACKEND] startBackend response: `, response);
}

async function terminateBackend() {
  const response = await invoke('stop_server');
  console.log(`[USE START BACKEND] terminateBackend response: `, response);
}

// async function restartBackend() {
//   const response = await invoke('restart_server');
//   console.log(`[USE START BACKEND] restartBackend response: `, response);
// }

export const useStartServer = () => {
  return useMutation({
    mutationKey: ['startBackend'],
    mutationFn: startBackend,
  });
};

export const useStartBackend = () => {
  const { isPending, mutate, isSuccess } = useStartServer();
  useEffect(() => {
    mutate();
  }, []);

  return { isPending, isSuccess };
};

export const useStopServer = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationKey: ['terminateBackend'],
    mutationFn: terminateBackend,
    onSuccess: () => {
      onSuccess();
    },
    onError: (error) => {
      console.error(`[USE STOP SERVER] terminateBackend error: `, error);
    },
  });
};
