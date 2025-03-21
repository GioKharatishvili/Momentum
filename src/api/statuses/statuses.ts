import { IdWithName } from "@/types/shared";
import api from "../axiosInstance";

// ჯობდა კონსტანტა ყოფილიყო და არა აპიდან წამოსაღები, ესეც, დეპარტამენტებიც და პრიორიტეტებიც. თითქმის არასდროს იცვლება.
export const fetchStatuses = async (): Promise<IdWithName[]> => {
  const { data } = await api.get<IdWithName[]>("/statuses");

  return data;
};
