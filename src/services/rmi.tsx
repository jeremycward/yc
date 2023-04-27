import { useState, useEffect } from "react";

export type Rmi<I,O> = (input: I)=>Promise<O>
type ConcatY = <T>(a: T, b: T) => T;
export const useRmi = (rmi: Rmi<any,any>, inputParams: any) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async (): Promise<void> => {
        try {
            const response = await rmi(inputParams)            
            setData(response);
        } catch (error) {
            setError(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return [data, error, loading, fetchData] as const;
};