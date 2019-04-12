<template>
    <div class="goods-edit">
    <cube-form
            :model="model"
            :schema="schema"
            :immediate-validate="false"
            :options="options"
            @validate="validateHandler"
            @submit="submitHandler"></cube-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                validity: {},
                valid: undefined,
                model: {
                    checkboxValue: false,
                    checkboxGroupValue: [],
                    inputValue: '',
                    radioValue: '',
                    rateValue: 0,
                    selectValue: 2018,
                    switchValue: true,
                    textareaValue: '',
                    uploadValue: []
                },
                schema: {
                    groups: [
                        {
                            legend: '封面轮播',
                            fields: [
                                {
                                    type: 'upload',
                                    modelKey: 'bannerList',
                                    events: {
                                        'file-removed': (...args) => {
                                            console.log('file removed', args)
                                        }
                                    },
                                    rules: {
                                        uploaded: (val, config) => {
                                            return Promise.all(val.map((file, i) => {
                                                return new Promise((resolve, reject) => {
                                                    // if (file.uploadedUrl) {
                                                    //     return resolve()
                                                    // }
                                                    // fake request
                                                    // setTimeout(() => {
                                                    //     if (i % 2) {
                                                    //         reject(new Error())
                                                    //     } else {
                                                    //         file.uploadedUrl = 'uploaded/url'
                                                    //         resolve()
                                                    //     }
                                                    // }, 1000)
                                                })
                                            })).then(() => {
                                                return true
                                            })
                                        }
                                    },
                                    messages: {
                                        uploaded: '上传失败'
                                    }
                                },
                                {
                                    type: 'input',
                                    modelKey: 'name',
                                    label: '商品名称',
                                    props: {
                                        placeholder: '请输入商品名称'
                                    },
                                    // validating when blur
                                    trigger: 'blur'
                                },
                                {
                                    type: 'input',
                                    modelKey: 'type',
                                    label: '商品类型',
                                    props: {
                                        placeholder: '请输入商品类型'
                                    },
                                    // validating when blur
                                    trigger: 'blur'
                                },
                                {
                                    type: 'input',
                                    modelKey: 'price',
                                    label: '商品价格',
                                    props: {
                                        placeholder: '请输入商品价格',
                                        type:'number'
                                    },
                                    // validating when blur
                                    trigger: 'blur'
                                }
                            ]
                        },
                        {
                            legend: '商品详情',
                            fields: [
                                {
                                    type:'textarea',
                                    modelKey: 'textareaValue',
                                    maxlength:200,
                                    props:{
                                        maxlength:200,
                                        placeholder:''
                                    },
                                    groups:[
                                        {
                                            type: 'input',
                                            modelKey: 'inputValue',
                                            label: '商品名称',
                                            props: {
                                                placeholder: '请输入商品名称'
                                            },
                                            // validating when blur
                                            trigger: 'blur'
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            fields: [
                                {
                                    type: 'submit',
                                    label: '保存'
                                }
                            ]
                        }
                    ]
                },
                options: {
                    scrollToInvalidField: true,
                    layout: 'standard' // classic fresh
                }
            }
        },
        methods: {
            submitHandler(e,model) {
                e.preventDefault()
                console.log( model)
            },
            validateHandler(result) {
                this.validity = result.validity
                this.valid = result.valid
                console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
            }
        }
    }
</script>
<style lang="less" scoped>
.cube-btn{
    
}
</style>
