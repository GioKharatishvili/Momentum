import { Button, Tag } from "@/components";
import { useTaskFilters } from "../../hooks/useTaskFilter";
import {
  useDepartments,
  useEmployees,
  usePriorities,
  useStatuses,
} from "@/hooks";
import { CLEAN_UP_BTN_LABEL, TaskFiltersState } from "../../lib";

export const TaskTagList = () => {
  const { state, setFilter } = useTaskFilters();

  const { data: departments } = useDepartments();
  const { data: employees } = useEmployees();
  const { data: priorities } = usePriorities();
  const { data: statuses } = useStatuses();

  const getFilterName = (id: number, data?: { id: number; name: string }[]) =>
    data?.find((item) => item.id === id)?.name || id.toString();

  const selectedTags = Object.entries(state).flatMap(([filterKey, ids]) =>
    (ids as number[]).map((id) => ({
      id,
      name:
        filterKey === "departments"
          ? getFilterName(id, departments)
          : filterKey === "employees"
          ? getFilterName(id, employees)
          : filterKey === "priorities"
          ? getFilterName(id, priorities)
          : filterKey === "statuses"
          ? getFilterName(id, statuses)
          : id.toString(),
    }))
  );

  const removeTag = (tagId: number) => {
    Object.keys(state).forEach((filterKey) => {
      setFilter(
        filterKey as keyof TaskFiltersState,
        state[filterKey as keyof TaskFiltersState].filter((id) => id !== tagId)
      );
    });
  };

  const removeAllTags = () => {
    Object.keys(state).forEach((filterKey) => {
      setFilter(filterKey as keyof TaskFiltersState, []);
    });
  };

  return (
    <div className="w-full min-h-20 px-2 py-6 flex items-center flex-wrap gap-2">
      {selectedTags.length > 0 && (
        <>
          {selectedTags.map(({ id, name }) => (
            <Tag key={id} label={name} onRemove={() => removeTag(id)} />
          ))}
          {selectedTags.length >= 1 && (
            <Button
              className="text-gray-400"
              label={CLEAN_UP_BTN_LABEL}
              onClick={removeAllTags}
            />
          )}
        </>
      )}
    </div>
  );
};
