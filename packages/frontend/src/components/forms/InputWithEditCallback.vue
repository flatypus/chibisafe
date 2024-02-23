<template>
	<div class="relative rounded-md bg-dark-100 border border-dark-80 px-3 py-2 shadow-sm" @blur="resetInputValue">
		<label
			class="absolute -top-2 left-2 -mt-px pointer-events-none inline-block bg-dark-100 px-1 text-xs font-medium text-light-100"
			>{{ label }}</label
		>

		<a
			v-if="type === 'link'"
			class="block w-full border-0 p-0 text-blue-400 hover:text-blue-500 placeholder-gray-500 focus:ring-0 sm:text-sm bg-dark-100 truncate"
			rel="noopener noreferrer"
			target="_blank"
			:title="href ?? value"
			:href="href ?? value"
			>{{ value }}</a
		>

		<input
			v-else
			ref="inputRef"
			:type="type"
			class="block w-full border-0 p-0 text-light-100 placeholder-gray-500 focus:ring-0 sm:text-sm bg-dark-100 truncate"
			:class="[blur ? 'blur-sm hover:blur-none' : '']"
			:value="inputValue"
			:placeholder="placeholder"
			@input="updateValue"
		/>

		<button type="button" class="absolute right-2 top-2" title="Edit" @click="editButtonClicked">
			<Edit v-if="inputValue === getValue" class="h-5 w-5 text-light-100 hover:text-white" />
			<p v-else>Save</p>
		</button>
	</div>
</template>

<script setup lang="ts">
import { Edit } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const props = defineProps({
	label: {
		type: String,
		default: 'change-me'
	},
	value: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: 'text'
	},
	href: {
		type: String,
		default: ''
	},
	blur: {
		type: Boolean
	},
	callback: {
		type: Function,
		required: true
	}
});

const getValue = computed(() => props.value);
const getCallback = computed(() => props.callback);

const inputRef = ref<HTMLInputElement | null>(null);
const inputValue = ref(getValue.value);

const resetInputValue = () => {
	inputValue.value = getValue.value;
};

const updateValue = (event: any) => {
	inputValue.value = event.target.value;
};

const editButtonClicked = () => {
	if (inputValue.value === getValue.value) {
		if (!inputRef.value) return;
		inputRef.value.focus();
		inputRef.value.select();
	} else {
		getCallback.value(inputValue.value);
	}
};
</script>
