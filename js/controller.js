
/*
*  Use $(window).load() instead of $(document).ready() because we wan't to start caching images
*  as soon as the progress bar images are loaded.
*/

$(window).on('load', ()=>new Loader());