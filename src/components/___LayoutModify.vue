<template>
    <div>
        <div class="container">
            <main class="main">
                <PrincipalNav />
                
                <div class="principal-content">
                    <section class="channel">
                        <h2 class="tag-content">GENERAL</h2>

                        <label for="name"></label>
                        <inputDefault v-model="fields[0].value" id="name" placeholder="Nouveau nom"/>

                        <label for="description"></label>
                        <inputDefault v-model="fields[1].value" id="description" placeholder="Décrivez de quoi traite le channel"/>
                        
                    </section>
                </div>
            </main>
        </div>    
    </div>
</template>

<script>
    import inputDefault from "@/components/field/inputDefault.vue";
    export default {
        data(){
            return{
                fields : [
                    { value : "Groupe 1" },
                    { value : "" }
                ]
            }
        },
        components : {
            inputDefault
        }
    }
</script>

<style lang="scss">

</style>