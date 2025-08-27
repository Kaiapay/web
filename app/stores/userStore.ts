import React from 'react';
import { create } from 'zustand';
import { useGetUserMe } from '~/generated/api';
import { useCustomPrivy } from '~/hooks/use-custom-privy';
import { useQueryClient } from '@tanstack/react-query';

interface User {
    kaiapayId?: string;
}

interface UserStore {
    user: User | null;
    isLoading: boolean;
    error: any;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: any) => void;
    refetchUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    refetchUser: () => { },
}));

export const useUser = () => {
    const { authenticated, ready } = useCustomPrivy();
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useGetUserMe({
        query: {
            enabled: ready && authenticated,
            staleTime: 10 * 60 * 1000,
            retry: 3,
        },
    });

    const { setUser, setLoading, setError } = useUserStore();

    React.useEffect(() => {
        if (data?.user) {
            setUser(data.user as User);
        }
    }, [data, setUser]);

    React.useEffect(() => {
        setLoading(isLoading);
    }, [isLoading, setLoading]);

    React.useEffect(() => {
        setError(error);
    }, [error, setError]);

    const refetchUser = React.useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['/api/user/me'] });
    }, [queryClient]);

    return {
        user: data?.user as User | null,
        isLoading,
        error,
        refetchUser,
    };
};