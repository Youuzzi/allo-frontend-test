import { computed, ref } from "vue";
import { getRockets } from "@/services/rocketService";
import type { Rocket } from "@/types/rocket";

const rockets = ref<Rocket[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const searchQuery = ref("");

let hasLoaded = false;
let requestPromise: Promise<void> | null = null;

const filteredRockets = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return rockets.value;
  }

  return rockets.value.filter((rocket) => {
    return (
      rocket.name.toLowerCase().includes(query) ||
      rocket.description.toLowerCase().includes(query) ||
      (rocket.country?.toLowerCase().includes(query) ?? false)
    );
  });
});

async function fetchRockets(force = false): Promise<void> {
  if (hasLoaded && !force) {
    return;
  }

  if (requestPromise) {
    return requestPromise;
  }

  loading.value = true;
  error.value = null;

  requestPromise = (async () => {
    try {
      const data = await getRockets();

      rockets.value = [
        ...rockets.value.filter((rocket) => rocket.isCustom),
        ...data,
      ];

      hasLoaded = true;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "An unexpected error occurred.";
    } finally {
      loading.value = false;
      requestPromise = null;
    }
  })();

  return requestPromise;
}

function addRocket(rocket: Omit<Rocket, "id">): void {
  const newRocket: Rocket = {
    ...rocket,
    id: `custom-${Date.now()}`,
    isCustom: true,
  };

  rockets.value = [newRocket, ...rockets.value];
}

function findRocketById(id: string): Rocket | undefined {
  return rockets.value.find((rocket) => rocket.id === id);
}

export function useRockets() {
  return {
    rockets,
    filteredRockets,
    loading,
    error,
    searchQuery,
    fetchRockets,
    addRocket,
    findRocketById,
  };
}
