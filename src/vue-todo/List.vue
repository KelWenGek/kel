<template>
    <ul>
        <li v-for="item in  items">
            {{item}}
        </li>
    </ul>
</template>

<script>

    export default {
        name: 'list',
        data() {
            return {
                items: [1, 2, 3, 4]
            };
        },
        activated() {
            console.log('activated list');
        }
    }
</script>