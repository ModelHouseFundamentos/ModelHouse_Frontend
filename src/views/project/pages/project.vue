<script>
export default {
    name: "project",
    data() {
        return {
            titlev: null,
            pricev: null,
            categoryv: null,
            locationv: null,
            descriptionv: null
        }
    },
    methods: {
        onUpload() {
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        }
    }
}
</script>

<template>
        <section>
            <h1>Edit your business profile</h1>
        </section>
        <div class="form">
            <div class="title">
                <label for="title">Title</label>
                <InputText id="title" v-model="titlev" aria-describedby="email-help"/>
            </div>
            <div class="price">
                <label for="price">Price</label>
                <InputNumber id="price" v-model="pricev" inputId="currency-us" mode="currency" currency="USD" locale="en-US"/>
            </div>
            <div class="category">
                <label for="category">Category</label>
                <InputText id="category" v-model="categoryv" aria-describedby="confirm-password-help"/>
            </div>

            <div class="location">
                <label for="location">Location</label>
                <InputText id="location" v-model="locationv" aria-describedby="confirm-password-help"/>
            </div>

            <div class="description">
                <label for="description">Description</label>
                <Textarea id="description" v-model="descriptionv" rows="5" cols="30" />
            </div>

            <FileUpload mode="basic" name="Add File" url="" accept="image/*" :maxFileSize="1000000" @upload="onUpload" chooseLabel="Add File"/>

            <div class="text-down">
                <div style="font-size: 12px;">
                    you are agreeing to our <b><u style="cursor: pointer;">privacy policy</u></b>
                    and <b><u style="cursor: pointer;">terms of service.</u></b></div>
            </div>
            <div class="">
                <Button label="Publish" style="background-color: #02AA8B;
              border-color: #02AA8B; width: 400px; border-radius: 15px"/>
            </div>
        </div>



</template>

<style scoped>

h1{
    font-size: 38px;
    font-weight: 600;
    font-style: normal;
    line-height: 144px;
    padding: 0;
    margin: 10px;
}
section{
    display: flex;
    justify-content: center;
    text-transform: capitalize;
    position:  relative;
    top: 100px;
    margin: 0 auto;
    width: 50%;
}
.form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}
label{
    display: block;
    padding: 0 0 10px 0;
}
.title{
    position: relative;
    padding: 5px 0;
    margin: 35px 20px 5px 20px;
}

.price{
    position: relative;
    padding: 5px 0;
    margin: 5px 20px ;
}
.category{
    position: relative;
    padding: 5px 0;
    margin: 5px 20px ;

}
.location{
    position: relative;
    padding: 5px 0;
    margin: 5px 20px ;
}
.description{
    position: relative;
    padding: 5px 0;
    margin: 5px 20px ;
}

.text-down{
    position: relative;
    padding: 5px 0;
    margin: 5px 20px ;
}

#title, #price, #category, #location{
    width: 400px;
}
#description{
    width: 400px;
    height: 150px;
}

</style>