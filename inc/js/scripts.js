/* global jQuery */
/* jshint unused:false */

function sucuriscanAlertClose (id) {
    var element = document.getElementById('sucuriscan-alert-' + id);
    element.parentNode.removeChild(element);
}

jQuery(document).ready(function ($) {
    $('.sucuriscan-container').on('click', '.sucuriscan-modal-button', function (event) {
        event.preventDefault();
        var modalid = $(this).data('modalid');
        $('div.' + modalid + '-modal').removeClass('sucuriscan-hidden');
    });

    $('.sucuriscan-container').on('click', '.sucuriscan-overlay, .sucuriscan-modal-close', function (event) {
        event.preventDefault();
        $('.sucuriscan-overlay').addClass('sucuriscan-hidden');
        $('.sucuriscan-modal').addClass('sucuriscan-hidden');
    });

    $('.sucuriscan-container').on('click', '.sucuriscan-show-more', function (event) {
        event.preventDefault();
        var button = $(this);
        var target = button.attr('data-target');
        var status = button.attr('data-status');
        if (status === 'more') {
            button.attr('data-status', 'less');
            $(target).removeClass('sucuriscan-hidden');
            button.find('.sucuriscan-show-more-title').html('Show Less Info');
        } else {
            button.attr('data-status', 'more');
            $(target).addClass('sucuriscan-hidden');
            button.find('.sucuriscan-show-more-title').html('Show More Info');
        }
    });

    if ($('.sucuriscan-tabs').length) {
        var hiddenState = 'sucuriscan-hidden';
        var visibleState = 'sucuriscan-visible';
        var activeState = 'sucuriscan-tab-active';
        var locationHash = location.href.split('#')[1];

        $('.sucuriscan-container').on('click', '.sucuriscan-tabs-buttons a', function (event) {
            event.preventDefault();

            var button = $(this);
            var uniqueid = button.attr('href').split('#')[1];

            if (uniqueid !== undefined) {
                var container = $('.sucuriscan-tabs-containers > #sucuriscan-tabs-' + uniqueid);

                if (container.length) {
                    var rawurl = location.href.replace(location.hash, '');
                    var newurl = rawurl + '#' + uniqueid;

                    window.history.pushState({}, document.title, newurl);

                    $('.sucuriscan-tabs-buttons a').removeClass(activeState);
                    $('.sucuriscan-tabs-containers > div').addClass(hiddenState);

                    button.addClass(activeState);
                    container.addClass(visibleState);
                    container.removeClass(hiddenState);
                }
            }
        });

        $('.sucuriscan-tabs-containers > div').addClass(hiddenState);

        if (locationHash !== undefined) {
            $('.sucuriscan-tabs-buttons a').each(function (e, button) {
                if ($(button).attr('href').split('#')[1] === locationHash) {
                    $(button).trigger('click');
                }
            });
        } else {
            $('.sucuriscan-tabs-buttons li:first-child a').trigger('click');
        }
    }

    $('.sucuriscan-container').on('mouseover', '.sucuriscan-tooltip', function (event) {
        var element = $(this);
        var content = element.attr('content');
        var tooltip = $('<div>', { 'class': 'sucuriscan-tooltip-object' });

        tooltip.text(content);
        element.append(tooltip);
        var arrowHeight = 10; /* border width */
        var tooltipHeight = tooltip.outerHeight();
        tooltip.css('top', (tooltipHeight + arrowHeight) * -1);

        var positionLeft = 0;
        var elementWidth = element.outerWidth();
        var tooltipWidth = tooltip.outerWidth();

        if (elementWidth === tooltipWidth) {
            tooltip.css('left', 0);
        } else if (elementWidth > tooltipWidth) {
            tooltip.css('left', (elementWidth - tooltipWidth) / 2);
        } else if (elementWidth < tooltipWidth) {
            tooltip.css('left', ((tooltipWidth - elementWidth) / 2) * -1);
        }
    });

    $('.sucuriscan-container').on('mouseout', '.sucuriscan-tooltip', function (event) {
        $(this).find('.sucuriscan-tooltip-object').remove();
    });
});
