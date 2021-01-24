<template>
	<div>
		<Blackout/>
	</div>
</template>
<script>
	import Blackout from '@/components/Blackout.vue'
	export default {
		components: {
			Blackout
		},
		props: ['id'],
	}
</script>
