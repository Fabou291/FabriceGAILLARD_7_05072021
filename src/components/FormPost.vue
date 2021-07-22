<template>
    <form class="form-post" action="" >
        <button type='button' class="form-post__brownse-btn form-post-btn">
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
                ></path>
            </svg>
        </button>

        <textarea
            @keydown.enter.prevent="submit($event); updateHeight($event.target)"
            @input="updateHeight($event.target); $emit('update:modelValue', $event.target.value)"
            class="form-post__field"
            :class="{ 'form-post__field--active' : value }"
            type="text"
            placeholder="Envoyer un message dans ce groupe"
            :value='modelValue'
            ref='textarea'
        ></textarea>

        <button type='button' class="form-post-btn">
            <svg width="24" height="24"  viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M2 2C0.895431 2 0 2.89543 0 4V20C0 21.1046 0.89543 22 2 22H22C23.1046 22 24 21.1046 24 20V4C24 2.89543 23.1046 2 22 2H2ZM9.76445 11.448V15.48C8.90045 16.044 7.88045 16.356 6.74045 16.356C4.11245 16.356 2.66045 14.628 2.66045 12.072C2.66045 9.504 4.23245 7.764 6.78845 7.764C7.80845 7.764 8.66045 8.004 9.32045 8.376L9.04445 10.164C8.42045 9.768 7.68845 9.456 6.83645 9.456C5.40845 9.456 4.71245 10.512 4.71245 12.06C4.71245 13.62 5.43245 14.712 6.86045 14.712C7.31645 14.712 7.64045 14.616 7.97645 14.448V12.972H6.42845V11.448H9.76445ZM11.5481 7.92H13.6001V16.2H11.5481V7.92ZM20.4724 7.92V9.636H17.5564V11.328H19.8604V13.044H17.5564V16.2H15.5164V7.92H20.4724Z"
                ></path>
            </svg>
        </button>
        <button type='button' class="form-post-btn">
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
                ></path>
            </svg>
        </button>
    </form>
</template>

<script>
export default {
    data(){
        return{
            value : '',
        }
    },
    props : {
        modelValue : { type : String, required : true }
    },
    methods: {
        submit(e) {
            if(this.modelValue.trim() == '') return;
            this.$emit('addPost',this.value);
            e.target.value = '';
        },
        updateHeight(element){
            element.style.height = '30px';
            element.style.height = element.scrollHeight + 'px';
        },
        parseEmoji(){
            let regex = /:\w+:/g;
            if(regex.test(this.value)){
                this.value.match(regex).forEach(shortCode => {
                
                    if(Object.keys(this.emoji.emojisShortCodeIndex).includes(shortCode)){

                        this.value = this.value.replace(
                            shortCode, 
                            `<img width="24px" src="${require('@/assets/twemoji/svg/' + this.emoji.emojisShortCodeIndex[shortCode].u.join('-').toLowerCase() + '.svg')}">`
                        )

                        
                    }
                    
                });
            }
        }

    },
    mounted() {
        this.updateHeight(this.$refs['textarea']);
    }
};
</script>

<style lang="scss">
.form-post {
    background-color: $grey-32;
    color: $grey-142;
    border-radius: 4px;
    display: flex;
    align-items: flex-start;
    padding : 10px;
    position: sticky;
    top: 0;
    z-index : 2;


    &__field {
        flex: 1;
        color: inherit;
        background-color: transparent;
        resize: none;
        border: none;
        overflow: hidden;
        padding: 7px;
        height : 30px;
        @include setCircularStdFont('Book');

        &--active{
            color : lighten($grey-142,40%);
        }

    }

    &__brownse-btn {
    }
}

.form-post-btn {
    padding: 4px;
    margin : 0 4px;
    &:hover {
        color: lighten($grey-142, 10%);
    }
}
</style>
