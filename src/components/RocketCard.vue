<template>
  <v-card
    class="rocket-card h-100"
    rounded="xl"
    elevation="0"
    border
    :to="`/rockets/${rocket.id}`"
  >
    <div class="rocket-image-wrapper">
      <v-img
        :src="rocket.imageUrl || undefined"
        :alt="rocket.name"
        height="220"
        cover
        class="rocket-image"
      >
        <template #error>
          <div class="image-fallback">
            <v-icon
              icon="mdi-rocket-launch-outline"
              size="56"
            />
            <span>Image unavailable</span>
          </div>
        </template>

        <template #placeholder>
          <div class="image-fallback">
            <v-progress-circular
              indeterminate
              color="primary"
            />
          </div>
        </template>
      </v-img>

      <v-chip
        v-if="rocket.isCustom"
        class="custom-chip"
        color="primary"
        size="small"
        variant="flat"
      >
        Custom
      </v-chip>
    </div>

    <v-card-text class="pa-5">
      <div class="d-flex align-center justify-space-between mb-3">
        <span class="text-caption text-medium-emphasis">
          {{ rocket.country || "Country unavailable" }}
        </span>

        <v-icon
          icon="mdi-arrow-top-right"
          size="small"
          color="medium-emphasis"
        />
      </div>

      <h3 class="text-h6 font-weight-bold mb-3">
        {{ rocket.name }}
      </h3>

      <p class="text-body-2 text-medium-emphasis description">
        {{ rocket.description || "No description available for this rocket." }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Rocket } from "@/types/rocket";

defineProps<{
  rocket: Rocket;
}>();
</script>

<style scoped>
.rocket-card {
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.rocket-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.rocket-image-wrapper {
  position: relative;
  overflow: hidden;
}

.rocket-image {
  background: #f1f3f5;
}

.image-fallback {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #7b8491;
  background: #f1f3f5;
  font-size: 13px;
}

.custom-chip {
  position: absolute;
  top: 14px;
  right: 14px;
}

.description {
  display: -webkit-box;
  overflow: hidden;
  min-height: 60px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-height: 1.5;
}
</style>
