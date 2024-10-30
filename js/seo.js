/*
Author: LIQUID DESIGN Ltd.
Author URI: https://lqd.jp/wp/
*/
var __ = wp.i18n.__;
jQuery(function ($) {
    // ini
    if( window == window.parent ) {
        $('body').append('<div class="liquid_seo"><b>LIQUID SEO</b><i></i><table></table><small>Powered by <a href="https://lqd.jp/wp/" target="_blank">LIQUID PRESS</a></small>');
    }
    if( localStorage.getItem('liquid_seo') ){
        $('.liquid_seo').addClass('liquid_seo_close');
    }
    if( $('#wpadminbar').length ){
        $('.liquid_seo').addClass('liquid_seo_underbar');
    }
    // btn
    $('.liquid_seo i').on('click',function(){
        $('.liquid_seo').toggleClass('liquid_seo_close');
        if( localStorage.getItem('liquid_seo') ){
            localStorage.removeItem('liquid_seo');
        }else{
            localStorage.setItem('liquid_seo', 1);
        }
    });
    // time
    var lsilt = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    if ( Math.sign(lsilt/1000) == 1) {
        $('.liquid_seo table').before('<div class="lsilt">' + __('Load time: ', 'liquid-seo-inspector') + lsilt/1000 + 's</div>');
    }
    // tab
    $('.liquid_seo table').before('<div class="lsitab"><a data-tab="lsi01" class="lsiact">Title/Meta</a><a data-tab="lsi02">OGP</a><a data-tab="lsi03">Rel</a><a data-tab="lsi04">H1-6</a><a data-tab="lsi05">Img</a><a data-tab="lsi06">GTM/GA</a><a data-tab="lsi07">JSON-LD</a></div>');
    $('.liquid_seo .lsitab a').on('click',function(){
        $('.liquid_seo .lsitab a').removeClass('lsiact');
        $(this).addClass('lsiact');
        const lsitab = $(this).data('tab');
        $('.liquid_seo table tr').hide();
        $('.liquid_seo table tr.'+lsitab).show();
    });
    // table
    // Title/Meta
    $('.liquid_seo table').append('<tr class="lsi01 lsit"><th colspan="2">Title/Meta</th></tr>');
    if( !$('title').length ){
        $('.liquid_seo table').append('<tr class="lsi01 lsired"><th>title</th><td>'+__('Empty', 'liquid-seo-inspector')+'</td></tr>');
    }
    $('title').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi01 lsiuni"><th>title</th><td>' + $(this).text() + ' (' + $(this).text().trim().length + ')</td></tr>');
    });
    if( !$('meta[name="description"]').length ){
        $('.liquid_seo table').append('<tr class="lsi01 lsired"><th>description</th><td>'+__('Empty', 'liquid-seo-inspector')+'</td></tr>');
    }
    $('meta[name="description"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi01 lsiuni"><th>description</th><td>' + $(this).attr('content') + ' (' + $(this).attr('content').trim().length + ')</td></tr>');
    });
    $('meta[name="keywords"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi01 lsiuni"><th>keywords</th><td>' + $(this).attr('content') + '</td></tr>');
    });
    $('meta[name="robots"]').each(function(i) {
        if ( $(this).attr('content').match(/noindex/)) {
            $('.liquid_seo table').append('<tr class="lsi01 lsired"><th>robots</th><td>' + $(this).attr('content') + '</td></tr>');
        }else{
            $('.liquid_seo table').append('<tr class="lsi01 lsiuni"><th>robots</th><td>' + $(this).attr('content') + '</td></tr>');
        }
    });
    $('meta[name="author"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi01 lsiuni"><th>author</th><td>' + $(this).attr('content') + '</td></tr>');
    });
    // OGP/Twitter
    $('.liquid_seo table').append('<tr class="lsi02 lsit"><th colspan="2">OGP/Twitter</th></tr>');
    if( !$('meta[property*="og:"').length ){
        $('.liquid_seo table').append('<tr class="lsi02 lsired"><th>og:</th><td>'+__('Empty', 'liquid-seo-inspector')+'</td></tr>');
    }
    $('meta[property="article:publisher"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi02 lsiuni"><th>article:publisher</th><td>' + $(this).attr('content') + '</td></tr>');
    });
    $('meta[property="article:published_time"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi02 lsiuni"><th>article:published_time</th><td>' + $(this).attr('content') + '</td></tr>');
    });
    $('meta[property="article:modified_time"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi02 lsiuni"><th>article:modified_time</th><td>' + $(this).attr('content') + '</td></tr>');
    });
    $('meta[property="og:site_name"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi02 lsiuni"><th>og:site_name</th><td>' + $(this).attr('content') + '</td></tr>');
    });
    $('meta[property="og:title"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi02 lsiuni"><th>og:title</th><td>' + $(this).attr('content') + '</td></tr>');
    });
    $('meta[property="og:description"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi02 lsiuni"><th>og:description</th><td>' + $(this).attr('content') + '</td></tr>');
    });
    $('meta[property="og:url"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi02 lsiuni"><th>og:url</th><td>' + $(this).attr('content') + '</td></tr>');
    });
    $('meta[property="og:type"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi02 lsiuni"><th>og:type</th><td>' + $(this).attr('content') + '</td></tr>');
    });
    $('meta[property="og:image"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi02 lsiuni"><th>og:image</th><td>' + $(this).attr('content') + '<br><img src="' + $(this).attr('content') + '" alt=""></td></tr>');
    });
    $('meta[property="og:locale"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi02 lsiuni"><th>og:locale</th><td>' + $(this).attr('content') + '</td></tr>');
    });
    $('.liquid_seo table').append('<tr class="lsi02 lsit"><th colspan="2">Twitter</th></tr>');
    $('meta[name^="twitter:"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi02 lsiuni"><th>' + $(this).attr('name') + '</th><td>' + $(this).attr('content') + '</td></tr>');
    });
    // Relation
    $('.liquid_seo table').append('<tr class="lsi03 lsit"><th colspan="2">Relation</th></tr>');
    if( !$('link[rel="canonical"]').length ){
        $('.liquid_seo table').append('<tr class="lsi03 lsired"><th>canonical</th><td>'+__('Empty', 'liquid-seo-inspector')+'</td></tr>');
    }
    $('link[rel="canonical"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi03 lsiuni"><th>canonical</th><td>' + $(this).attr('href') + '</td></tr>');
    });
    $('link[rel="start"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi03 lsiuni"><th>start</th><td>' + $(this).attr('href') + '</td></tr>');
    });
    $('link[rel="amphtml"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi03 lsiuni"><th>amphtml</th><td>' + $(this).attr('href') + '</td></tr>');
    });
    $('link[rel="manifest"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi03 lsiuni"><th>manifest</th><td>' + $(this).attr('href') + '</td></tr>');
    });
    $('link[rel*="next"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi03 lsiuni"><th>next</th><td>' + $(this).attr('href') + '</td></tr>');
    });
    $('link[rel*="prev"]').each(function(i) {
        $('.liquid_seo table').append('<tr class="lsi03 lsiuni"><th>prev</th><td>' + $(this).attr('href') + '</td></tr>');
    });
    $('link[hreflang]').each(function(i) {
        i++;
        $('.liquid_seo table').append('<tr class="lsi03"><th>hreflang (' + i + ')</th><td>' + $(this).attr('hreflang') + ': ' + $(this).attr('href') + '</td></tr>');
    });
    // Headings
    $('.liquid_seo table').append('<tr class="lsi04 lsit"><th colspan="2">Headings</th></tr>');
    if( !$('h1').length ){
        $('.liquid_seo table').append('<tr class="lsi04 lsired"><th>h1</th><td>'+__('Empty', 'liquid-seo-inspector')+'</td></tr>');
    }
    $('h1').each(function(i) {
        i++;
        if( $(this).text().length && $(this).find('img').length ){
            $('.liquid_seo table').append('<tr class="lsi04"><th>h1 (' + i + ')</th><td>' + $(this).find('img').attr('alt') + ' (' + $(this).find('img').attr('alt').trim().length + ')(img)</td></tr>');
        }else{
            $('.liquid_seo table').append('<tr class="lsi04"><th>h1 (' + i + ')</th><td>' + $(this).text() + ' (' + $(this).text().trim().length + ')</td></tr>');
        }
    });
    if( !$('h2').length ){
        $('.liquid_seo table').append('<tr class="lsi04 lsired"><th>h2</th><td>'+__('Empty', 'liquid-seo-inspector')+'</td></tr>');
    }
    $('h2').each(function(i) {
        i++;
        if( $(this).text().length && $(this).find('img').length ){
            $('.liquid_seo table').append('<tr class="lsi04"><th>h2 (' + i + ')</th><td>' + $(this).find('img').attr('alt') + ' (' + $(this).find('img').attr('alt').trim().length + ')(img)</td></tr>');
        }else{
            $('.liquid_seo table').append('<tr class="lsi04"><th>h2 (' + i + ')</th><td>' + $(this).text() + ' (' + $(this).text().trim().length + ')</td></tr>');
        }
    });
    $('h3').each(function(i) {
        i++;
        $('.liquid_seo table').append('<tr class="lsi04"><th>h3 (' + i + ')</th><td>' + $(this).text() + ' (' + $(this).text().trim().length + ')</td></tr>');
    });
    $('h4').each(function(i) {
        i++;
        $('.liquid_seo table').append('<tr class="lsi04"><th>h4 (' + i + ')</th><td>' + $(this).text() + ' (' + $(this).text().trim().length + ')</td></tr>');
    });
    $('h5').each(function(i) {
        i++;
        $('.liquid_seo table').append('<tr class="lsi04"><th>h5 (' + i + ')</th><td>' + $(this).text() + ' (' + $(this).text().trim().length + ')</td></tr>');
    });
    $('h6').each(function(i) {
        i++;
        $('.liquid_seo table').append('<tr class="lsi04"><th>h6 (' + i + ')</th><td>' + $(this).text() + ' (' + $(this).text().trim().length + ')</td></tr>');
    });
    // Images
    $('.liquid_seo table').append('<tr class="lsi05 lsit"><th colspan="2">Images</th></tr>');
    $('img').not('#wpadminbar img').each(function(i) {
        i++;
        $('.liquid_seo table').append('<tr class="lsi05"><th>img (' + i + ')</th><td>' + $(this).attr('src') + '</td></tr>');
        if( $(this).attr('alt') ){
            $('.liquid_seo table').append('<tr class="lsi05"><td colspan="2"><em>alt</em>' + $(this).attr('alt') + '</td></tr>');
        }else{
            $('.liquid_seo table').append('<tr class="lsi05"><td colspan="2" class="lsired"><em>alt</em>'+__('Empty', 'liquid-seo-inspector')+'</td></tr>');
        }
        if( $(this).attr('loading') ){
            $('.liquid_seo table').append('<tr class="lsi05"><td colspan="2"><em>loading</em>' + $(this).attr('loading') + '</td></tr>');
        }
    });
    // GTM
    $('.liquid_seo table').append('<tr class="lsi06 lsit"><th colspan="2">GTM/GA</th></tr>');
    var lsig = '';
    $('script').each(function(i) {
        if( $(this).attr('src') && $(this).attr('src').match(/googletagmanager.com/) ) {
            $('.liquid_seo table').append('<tr class="lsi06"><th>gtag</th><td>' + $(this).attr('src') + '</td></tr>');
            lsig = 1;
        }
        if( $(this).text().match(/function gtag/) ) {
            $('.liquid_seo table').append('<tr class="lsi06"><td colspan="2"><pre>' + $(this).text() + '</pre></td></tr>');
            lsig = 1;
        }
        if( $(this).text().match(/googletagmanager.com/) ) {
            $('.liquid_seo table').append('<tr class="lsi06"><td colspan="2"><pre>' + $(this).text() + '</pre></td></tr>');
            lsig = 1;
        }
    });
    if( !lsig ){
        $('.liquid_seo table').append('<tr class="lsi06"><td colspan="2">'+__('Empty', 'liquid-seo-inspector')+'</td></tr>');
    }
    // JSON-LD
    $('.liquid_seo table').append('<tr class="lsi07 lsit"><th colspan="2">JSON-LD</th></tr>');
    if( !$('script[type*="ld+json"]').length ){
        $('.liquid_seo table').append('<tr class="lsi07"><td colspan="2">'+__('Empty', 'liquid-seo-inspector')+'</td></tr>');
    }
    $('script[type="application/ld+json"]').each(function(i) {
        const lsij = $(this).text();
        try {
            const lsip = JSON.parse(lsij);
            const lsis = JSON.stringify(lsip, null, 2);
            $('.liquid_seo table').append('<tr class="lsi07"><td colspan="2"><pre>' + lsis + '</pre></td></tr>');
        } catch (error) {
            $('.liquid_seo table').append('<tr class="lsi07"><td colspan="2" class="lsired">error</td></tr>');
        }
    });

    // check
    $('.liquid_seo .lsiuni th').filter(function () {
        const lsiu = $(this).text();
        return this !== $(`.liquid_seo .lsiuni th:contains('${lsiu}')`).get(0);
    }).addClass('lsired lsidup').prepend('<em>'+__('Duplicate', 'liquid-seo-inspector')+'</em>');
});