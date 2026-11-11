<template>
  <v-dialog v-model="dialog" max-width="600" persistent>
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        size="large"
      >
        Add Rocket
      </v-btn>
    </template>

    <v-card rounded="xl">
      <v-card-title class="pa-6 pb-2">
        <div class="text-h5 font-weight-bold">Add New Rocket</div>
        <div class="text-body-2 text-medium-emphasis mt-1">
          Add a custom rocket to your catalogue.
        </div>
      </v-card-title>

      <v-card-text class="pa-6">
        <v-form ref="formRef" @submit.prevent="submitForm">
          <v-text-field
            v-model="form.name"
            label="Rocket name"
            placeholder="e.g. Falcon Heavy"
            variant="outlined"
            :rules="[requiredRule]"
          />

          <v-textarea
            v-model="form.description"
            label="Description"
            placeholder="Describe this rocket..."
            variant="outlined"
            rows="3"
            auto-grow
          />

          <v-text-field
            v-model="form.imageUrl"
            label="Image URL"
            placeholder="https://example.com/rocket.jpg"
            variant="outlined"
            prepend-inner-icon="mdi-image-outline"
          />

          <v-text-field
            v-model="form.launchCost"
            label="Cost per launch"
            placeholder="e.g. $90 million"
            variant="outlined"
          />

          <v-text-field
            v-model="form.country"
            label="Country"
            placeholder="e.g. US"
            variant="outlined"
          />

          <v-text-field
            v-model="form.firstFlight"
            label="First flight"
            type="date"
            variant="outlined"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-spacer />

        <v-btn variant="text" @click="closeDialog"> Cancel </v-btn>

        <v-btn color="primary" variant="flat" rounded="lg" @click="submitForm">
          Save Rocket
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { VForm } from "vuetify/components";
import type { Rocket } from "@/types/rocket";

const emit = defineEmits<{
  add: [rocket: Omit<Rocket, "id">];
}>();

const dialog = ref(false);
const formRef = ref<VForm | null>(null);

const initialForm = () => ({
  name: "",
  description: "",
  imageUrl: "",
  launchCost: "",
  country: "",
  firstFlight: "",
});

const form = reactive(initialForm());

const requiredRule = (value: string) =>
  !!value?.trim() || "Rocket name is required";

async function submitForm() {
  const result = await formRef.value?.validate();

  if (!result?.valid) {
    return;
  }

  emit("add", {
    name: form.name.trim(),
    description: form.description.trim(),
    imageUrl: form.imageUrl.trim() || null,
    launchCost: form.launchCost.trim() || null,
    country: form.country.trim() || null,
    firstFlight: form.firstFlight || null,
    isCustom: true,
  });

  closeDialog();
}

function closeDialog() {
  dialog.value = false;
  Object.assign(form, initialForm());
  formRef.value?.resetValidation();
}
</script>
