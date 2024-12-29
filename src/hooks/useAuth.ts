import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/AuthAPI";

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false, // <-- si cambio de window en el browser y luego vuelvo a la del project no hace un refetch con esto en false (default is true)
  });

  return { data, isError, isLoading };
};
