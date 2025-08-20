<template>
<div>
    <div class="linux-header">
        <div class="container">
            <a href="https://www.linuxfoundation.org/projects?__hstc=81619592.11739e1f4ca03192f4e918409f725053.1748961872693.1753191442307.1753265591717.10&amp;__hssc=81619592.1.1753265591717&amp;__hsfp=2164450451" target="_blank" rel="noopener noreferrer">
            <img src="https://neonephos.org/wp-content/uploads/banners/lfprojects_banner_other.svg" alt="The Linux Foundation Projects">
            </a>
        </div>
    </div>
</div>

</template>

<style scoped>

.linux-header {
  display:none;
}

@media (min-width: 801px) {

    .linux-header {
    background-color: #252525;
    width: 100%;
    height: 33px;
    line-height: 33px;
    display: flex;
    align-items: center;
    z-index: 99999;
    position:fixed;
    }

    .container {
        margin: 0 auto;
        position: relative;
        padding: 0 33px;
        width:100%;
    }

    .container:after, .container:before {
    content: " ";
    display: table;
    }

    .linux-header img {
    max-width: 270px;
    height: auto;
    vertical-align: middle;
    }
}

@media (min-width: 1454px) {
    .linux-header {
    padding: 0 calc(0px + (100vw - 1454px)/2);
    }
}


</style>