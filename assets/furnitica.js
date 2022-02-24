(function(jQuery) {
    if (jQuery(".collection-sidebar")) {
        //work only in collection page
        History.Adapter.bind(window, 'statechange', function() {
            var State = History.getState();
            if (!furnitica.isSidebarAjaxClick) {
                furnitica.sidebarParams();
                var newurl = furnitica.sidebarCreateUrl();
                furnitica.sidebarGetContent(newurl);
                furnitica.reActivateSidebar();
            }
            furnitica.isSidebarAjaxClick = false;
        });
    }
    if (window.use_color_swatch) {
        jQuery('.swatch :radio').change(function() {
            var optionIndex = jQuery(this).closest('.swatch').attr('data-option-index');
            var optionValue = jQuery(this).val();
            jQuery(this)
                .closest('form')
                .find('.single-option-selector')
                .eq(optionIndex)
                .val(optionValue)
                .trigger('change');
        });

        // (c) Copyright 2014 Caroline Schnapp. All Rights Reserved. Contact: mllegeorgesand@gmail.com
        // See http://docs.shopify.com/manual/configuration/store-customization/advanced-navigation/linked-product-options

        Shopify.optionsMap = {};

        Shopify.updateOptionsInSelector = function(selectorIndex) {

            switch (selectorIndex) {
                case 0:
                    var key = 'root';
                    var selector = jQuery('.single-option-selector:eq(0)');
                    break;
                case 1:
                    var key = jQuery('.single-option-selector:eq(0)').val();
                    var selector = jQuery('.single-option-selector:eq(1)');
                    break;
                case 2:
                    var key = jQuery('.single-option-selector:eq(0)').val();
                    key += ' / ' + jQuery('.single-option-selector:eq(1)').val();
                    var selector = jQuery('.single-option-selector:eq(2)');
            }

            var initialValue = selector.val();
            selector.empty();
            var availableOptions = Shopify.optionsMap[key];
            if (availableOptions && availableOptions.length) {
              for (var i = 0; i < availableOptions.length; i++) {
                  var option = availableOptions[i];
                  var newOption = jQuery('<option></option>').val(option).html(option);
                  selector.append(newOption);
              }
              jQuery('.swatch[data-option-index="' + selectorIndex + '"] .swatch-element').each(function() {
                  if (jQuery.inArray(jQuery(this).attr('data-value'), availableOptions) !== -1) {
                      jQuery(this).removeClass('soldout').show().find(':radio').removeAttr('disabled', 'disabled').removeAttr('checked');
                  } else {
                      jQuery(this).addClass('soldout').show().find(':radio').removeAttr('checked').attr('disabled', 'disabled');
                  }
              });
              if (jQuery.inArray(initialValue, availableOptions) !== -1) {
                  selector.val(initialValue);
              }
              selector.trigger('change');
            }
        };

        Shopify.linkOptionSelectors = function(product) {
            // Building our mapping object.
            for (var i = 0; i < product.variants.length; i++) {
                var variant = product.variants[i];
                if (variant.available) {
                    // Gathering values for the 1st drop-down.
                    Shopify.optionsMap['root'] = Shopify.optionsMap['root'] || [];
                    Shopify.optionsMap['root'].push(variant.option1);
                    Shopify.optionsMap['root'] = Shopify.uniq(Shopify.optionsMap['root']);
                    // Gathering values for the 2nd drop-down.
                    if (product.options.length > 1) {
                        var key = variant.option1;
                        Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
                        Shopify.optionsMap[key].push(variant.option2);
                        Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
                    }
                    // Gathering values for the 3rd drop-down.
                    if (product.options.length === 3) {
                        var key = variant.option1 + ' / ' + variant.option2;
                        Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
                        Shopify.optionsMap[key].push(variant.option3);
                        Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
                    }
                }
            }
            // Update options right away.
            Shopify.updateOptionsInSelector(0);
            if (product.options.length > 1) Shopify.updateOptionsInSelector(1);
            if (product.options.length === 3) Shopify.updateOptionsInSelector(2);
            // When there is an update in the first dropdown.
            jQuery(".single-option-selector:eq(0)").change(function() {
                Shopify.updateOptionsInSelector(1);
                if (product.options.length === 3) Shopify.updateOptionsInSelector(2);
                return true;
            });
            // When there is an update in the second dropdown.
            jQuery(".single-option-selector:eq(1)").change(function() {
                if (product.options.length === 3) Shopify.updateOptionsInSelector(2);
                return true;
            });

        };
    }

    jQuery(document).ready(function() {
        furnitica.init();
    });

    jQuery(window).resize(function() {
        furnitica.initMobileMenu();
        furnitica.initResizeImage();
    });

    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 200) {
            jQuery('#back-top').fadeIn();
        } else {
            jQuery('#back-top').fadeOut();
        }
    });
    jQuery(document).on('click touchstart', function(e) {
      var quickview = jQuery(".quick-view");
      var dropdowncart = jQuery("#dropdown-cart");
      var cartButton = jQuery("#cartToggle");
      var newsletter = jQuery("#email-modal .modal-window");
      var dropdownAccount = jQuery(".customer-area");
      var dropdownOtp = jQuery('.opt-area');

      //close quickview and dropdowncart when clicking outside
      if (!dropdownOtp.is(e.target) && dropdownOtp.has(e.target).length === 0 &&  !quickview.is(e.target) && quickview.has(e.target).length === 0 && !dropdowncart.is(e.target) && dropdowncart.has(e.target).length === 0 && !cartButton.is(e.target) && cartButton.has(e.target).length === 0 && !newsletter.is(e.target) && newsletter.has(e.target).length === 0 && !dropdownAccount.is(e.target) && dropdownAccount.has(e.target).length === 0) {
        furnitica.closeQuickViewPopup();
        furnitica.closeDropdownCart();
        furnitica.closeDropdownAccount();
      }
    });
    jQuery(document).keyup(function(e) {
        if (e.keyCode == 27) {
            furnitica.closeQuickViewPopup();
            furnitica.closeDropdownCart();
            furnitica.closeDropdownAccount();
      		furnitica.closeDropdownSearch();
            clearTimeout(furnitica.furniticaTimeout);
            if (jQuery('.modal').is(':visible')) {
                jQuery('.modal').fadeOut(500);
            }
        }
    });

    var furnitica = {
        furniticaTimeout: null,
        isSidebarAjaxClick: false,
        init: function() {
            this.initColorSwatchGrid();
            this.initResizeImage();
            this.initSidebar();
            this.initMobileSidebar();
          	this.initMobileMenu();
            this.initScrollTop();
            this.initQuickView();
            this.initCloudzoom();
            this.initProductMoreview();
            this.initAddToCart();
            this.initModal();
            this.initProductAddToCart();
            this.initDropDownCart();
      		this.initDropdownSearch();
            this.initToggleCollectionPanel();
            this.initWishlist();
            this.initProductWishlist();
            this.initRemoveWishlist();
            this.initInfiniteScrolling();
          	this.initScrollbar();
        },
        initScrollbar: function () {
//           jQuery("/*.sidebar-links .widget-content > ul, */.sidebar-custom ul").niceScroll({
//             cursoropacitymin: 1,
//             cursorborder:"",
//             cursorwidth: "5px",
//             cursorcolor:"#5e5e5e",
//             cursorborderradius:0,
//             background: "#ebebeb"
//           });
        },
        sidebarMapTagEvents: function() {
          	jQuery('.sidebar-tag a:not(".clear"), .sidebar-tag label').click(function(e) {
                var currentTags = [];
                if (Shopify.queryParams.constraint) {
                    currentTags = Shopify.queryParams.constraint.split('+');
                }

                //one selection or multi selection
                if (!window.enable_sidebar_multiple_choice && !jQuery(this).prev().is(":checked")) {
                    //remove other selection first
                    var otherTag = jQuery(this).parents('.sidebar-tag').find("input:checked");
                    if (otherTag.length > 0) {
                        var tagName = otherTag.val();
                        if (tagName) {
                            var tagPos = currentTags.indexOf(tagName);
                            if (tagPos >= 0) {
                                //remove tag
                                currentTags.splice(tagPos, 1);
                            }
                        }
                    }
                }

                var tagName = jQuery(this).prev().val();
                if (tagName) {
                    var tagPos = currentTags.indexOf(tagName);
                    if (tagPos >= 0) {
                        //tag already existed, remove tag
                        currentTags.splice(tagPos, 1);
                    } else {
                        //tag not existed
                        currentTags.push(tagName);
                    }
                }
                if (currentTags.length) {
                    Shopify.queryParams.constraint = currentTags.join('+');
                } else {
                    delete Shopify.queryParams.constraint;
                }
                furnitica.sidebarAjaxClick();
                e.preventDefault();
            });
        },
        sidebarMapCategories: function() {
            jQuery(".collection-sidebar .sidebar-links a").click(function(e) {
                if (!jQuery(this).hasClass('active')) {
                    delete Shopify.queryParams.q;
                    furnitica.sidebarAjaxClick(jQuery(this).attr('data-href'));

                    //activate selected category
                    jQuery(".sidebar-links a.active").removeClass("active");
                    jQuery(this).addClass("active");
                  
                  	var par = jQuery(this).parent();
                  	if (par.hasClass("dropdown") && !par.hasClass("click")) {
                    	jQuery(".dropdown.click").removeClass("click");
						par.addClass("click");                  	  
                  	}
                }
                e.preventDefault();
            });
          
          	jQuery(".sidebar-links li .caret").click(function(n)
            {
                var t = jQuery(this).parent();
                if (t.hasClass("click"))
                {
                    t.removeClass("click");
                }
                else
                {
                    t.addClass("click");
                }              
                n.preventDefault();
            });
        },
       sidebarMapView: function() {
            jQuery(".view-mode a").click(function(e) {
                if (!jQuery(this).hasClass("active")) {
                    var paging = jQuery(".filter-show > button span").text();
                    if (jQuery(this).hasClass("list")) {
                        Shopify.queryParams.view = "list" + paging;
                    } else {
                        Shopify.queryParams.view = paging;
                    }

                    furnitica.sidebarAjaxClick();
                    jQuery(".view-mode a.active").removeClass("active");
                    jQuery(this).addClass("active");
                }
                e.preventDefault();
            });
        },
        sidebarMapShow: function() {
            jQuery(".filter-show a").click(function(e) {
                if (!jQuery(this).parent().hasClass("active")) {
                    var thisPaging = jQuery(this).attr('href');

                    var view = jQuery(".view-mode a.active").attr("href");
                    if (view == "list") {
                        Shopify.queryParams.view = "list" + thisPaging;
                    } else {
                        Shopify.queryParams.view = thisPaging;
                    }

                    furnitica.sidebarAjaxClick();
                    jQuery(".filter-show > button span").text(thisPaging);
                    jQuery(".filter-show li.active").removeClass("active");
                    jQuery(this).parent().addClass("active");
                }
                e.preventDefault();
            });
        },
        sidebarViewMode: function(){
          jQuery(".view-mode a.grid").click(function(e) {
            jQuery('.view-mode a.list').removeClass('active');
            jQuery(this).addClass('active');
            if(jQuery('.product-collection').hasClass('product-list')){
                jQuery('.product-collection').addClass('products-grid-covert');
            }
            else if(jQuery('.product-collection').hasClass('products-grid')){
              jQuery('.product-collection').removeClass('products-list-covert');
            }
          });

          jQuery(".view-mode a.list").click(function(e) {
            jQuery('.view-mode a.grid').removeClass('active');
            jQuery(this).addClass('active');   
            if(jQuery('.product-collection').hasClass('products-grid')){
                jQuery('.product-collection').addClass('products-list-covert');
            }
            else if(jQuery('.product-collection').hasClass('product-list')){
              jQuery('.product-collection').removeClass('products-grid-covert');
            }
          });
        },
        sidebarInitToggle: function() {
            if (jQuery(".sidebar-tag").length > 0) {
                jQuery(".sidebar-tag .widget-title span").click(function() {
                    var jQuerytitle = jQuery(this).parents('.widget-title');
                    if (jQuerytitle.hasClass('click')) {
                        jQuerytitle.removeClass('click');
                    } else {
                        jQuerytitle.addClass('click');
                    }

                    jQuery(this).parents(".sidebar-tag").find(".widget-content").slideToggle();
                });
            }
            if (jQuery(".sidebar-links").length > 0) {
                jQuery('.sidebar-links ul.cat-dropdown a').parents(".dropdown").removeClass("click");  
              	//jQuery('.sidebar-links a.active').parents('.dropdown').addClass("click");
                jQuery('.sidebar-links a.active').parents(".dropdown").addClass("click").find("ul.cat-dropdown").show();
                //jQuery('.sidebar-links a.active').parent().addClass("click").find("ul.dropdown-cat").show();
            }
        },
         sidebarMapSorting: function(e) {
            jQuery(".filter-sortby li span").click(function(e) {
                if (!jQuery(this).parent().hasClass("active")) {
                    Shopify.queryParams.sort_by = jQuery(this).attr("data-href");
                    furnitica.sidebarAjaxClick();
                    var sortbyText = jQuery(this).text();
                    jQuery(".filter-sortby > button span").text(sortbyText);
                    jQuery(".filter-sortby li.active").removeClass("active");
                    jQuery(this).parent().addClass("active");
                }
                e.preventDefault();
            });
        },
        sidebarMapPaging: function() {
            jQuery(".template-collection .pagination-page a").click(function(e) {
                var page = jQuery(this).attr("href").match(/page=\d+/g);
                if (page) {
                    Shopify.queryParams.page = parseInt(page[0].match(/\d+/g));
                    if (Shopify.queryParams.page) {
                        var newurl = furnitica.sidebarCreateUrl();
                        furnitica.isSidebarAjaxClick = true;
                        History.pushState({
                            param: Shopify.queryParams
                        }, newurl, newurl);
                        furnitica.sidebarGetContent(newurl);
                        //go to top
                        jQuery('body,html').animate({
                            scrollTop: 500
                        }, 600);
                    }
                }
                e.preventDefault();
            });
        },
        sidebarMapClearAll: function() {
            //clear all selection
            jQuery('.refined-widgets a.clear-all').click(function(e) {
                delete Shopify.queryParams.constraint;
                delete Shopify.queryParams.q;
                furnitica.sidebarAjaxClick();
                e.preventDefault();
            });
        },
        ClearSelected: function(){
              jQuery('.selected-tag a').click(function(e) {
                  var currentTags = [];
                  if (Shopify.queryParams.constraint) {
                      currentTags = Shopify.queryParams.constraint.split('+');
                  }

                  //one selection or multi selection
                  if (!window.enable_sidebar_multiple_choice && !jQuery(this).prev().is(":checked")) {
                      //remove other selection first
                      var otherTag = jQuery(this).parents('.selected-tag').find("input:checked");
                      if (otherTag.length > 0) {
                          var tagName = otherTag.val();
                          if (tagName) {
                              var tagPos = currentTags.indexOf(tagName);
                              if (tagPos >= 0) {
                                  //remove tag
                                  currentTags.splice(tagPos, 1);
                              }
                          }
                      }
                  }

                  var tagName = jQuery(this).prev().val();
                  if (tagName) {
                      var tagPos = currentTags.indexOf(tagName);
                      if (tagPos >= 0) {
                          //tag already existed, remove tag
                          currentTags.splice(tagPos, 1);
                      } else {
                          //tag not existed
                          currentTags.push(tagName);
                      }
                  }
                  if (currentTags.length) {
                      Shopify.queryParams.constraint = currentTags.join('+');
                  } else {
                      delete Shopify.queryParams.constraint;
                  }
                  furnitica.sidebarAjaxClick();
                  e.preventDefault();
              });
        },
        sidebarMapClear: function() {
            jQuery(".sidebar-tag").each(function() {
                var sidebarTag = jQuery(this);
                if (sidebarTag.find("input:checked").length > 0) {
                    //has active tag
                    sidebarTag.find(".clear").show().click(function(e) {
                        var currentTags = [];
                        if (Shopify.queryParams.constraint) {
                            currentTags = Shopify.queryParams.constraint.split('+');
                        }
                        sidebarTag.find("input:checked").each(function() {
                            var selectedTag = jQuery(this);
                            var tagName = selectedTag.val();
                            if (tagName) {
                                var tagPos = currentTags.indexOf(tagName);
                                if (tagPos >= 0) {
                                    //remove tag
                                    currentTags.splice(tagPos, 1);
                                }
                            }
                        });
                        if (currentTags.length) {
                            Shopify.queryParams.constraint = currentTags.join('+');
                        } else {
                            delete Shopify.queryParams.constraint;
                        }
						furnitica.sidebarAjaxClick();
                        e.preventDefault();
                    });
                }
            });
        },
        sidebarMapEvents: function() {
            furnitica.sidebarMapTagEvents();
            furnitica.sidebarMapCategories();
           furnitica.sidebarMapView();
            furnitica.sidebarMapShow();
          
      		//furnitica.sidebarViewMode();
            furnitica.sidebarMapSorting();
        },
        reActivateSidebar: function() {
            jQuery(".sidebar-custom .active, .sidebar-links .active").removeClass("active");
            jQuery(".sidebar-tag input:checked").attr("checked", false);

            //category
            var cat = location.pathname.match(/\/collections\/(.*)(\?)?/);
            if (cat && cat[1]) {
                jQuery(".sidebar-links a[data-href='" + cat[0] + "']").addClass("active");
            }

            //view mode and show filter
            if (Shopify.queryParams.view) {
                jQuery(".view-mode .active").removeClass("active");
                var view = Shopify.queryParams.view;
                if (view.indexOf("list") >= 0) {
                    jQuery(".view-mode .list").addClass("active");
                    //paging
                    view = view.replace("list", "");
                } else {
                    jQuery(".view-mode .grid").addClass("active");
                }
                jQuery(".filter-show > button span.number").text(view);
                jQuery(".filter-show li.active").removeClass("active");
                jQuery(".filter-show a[href='" + view + "']").parent().addClass("active");
            }
            furnitica.initSortby();
        },
        initSortby: function() {
            //sort by filter
            if (Shopify.queryParams.sort_by) {
                var sortby = Shopify.queryParams.sort_by;
                var sortbyText = jQuery(".filter-sortby span[data-href='" + sortby + "']").text();
                jQuery(".filter-sortby > button span").text(sortbyText);
                jQuery(".filter-sortby li.active").removeClass("active");
                jQuery(".filter-sortby span[data-href='" + sortby + "']").parent().addClass("active");
            }
        },
        sidebarMapData: function(data) {
            var currentList = jQuery(".col-main .products-grid");
            if (currentList.length == 0) {
                currentList = jQuery(".col-main .product-list");
            }
            var productList = jQuery(data).find(".col-main .products-grid");
            if (productList.length == 0) {
                productList = jQuery(data).find(".col-main .product-list");
            }
            if (productList.length > 0 && productList.hasClass("products-grid")) {
                if (window.product_image_resize) {
                    productList.find('img').fakecrop({
                        fill: window.images_size.is_crop,
                        widthSelector: ".products-grid .grid-item .product-image",
                        ratioWrapper: window.images_size
                    });
                }
            }
            currentList.replaceWith(productList);
            //convert currency
            if (furnitica.checkNeedToConvertCurrency()) {
                Currency.convertAll(window.shop_currency, jQuery('#currencies').val(), '.col-main span.money', 'money_format');
            }

            //replace paging
            if (jQuery(".padding").length > 0) {
                jQuery(".padding").replaceWith(jQuery(data).find(".padding"));
            } else {
                jQuery(".block-row.col-main").append(jQuery(data).find(".padding"));
            }
          
            // page top
          	if (jQuery(".padding_top").length > 0) {
                jQuery(".padding_top").replaceWith(jQuery(data).find(".padding_top"));
            } else {
                jQuery(".block-row.col-main .product-collection.products-grid").before(jQuery(data).find(".padding_top"));
            }
            //replace title & description
            var currentHeader = jQuery(".page-header");
            var dataHeader = jQuery(data).find(".page-header");
            if (currentHeader.find("h3").text() != dataHeader.find("h3").text()) {
                currentHeader.find("h3").replaceWith(dataHeader.find("h3"));
              
                var currentDes = jQuery(".collection-des");
                var dataDes = jQuery(data).find(".collection-des");
              
                if (currentDes.find(".rte").length) {
                    if (dataDes.find(".rte").length) {
                        currentDes.html(dataDes.find(".rte"));
                    } else {
                        currentDes.find(".rte").hide();
                    }
                } else {
                    currentDes.html(dataDes.find(".rte"));
                }
              
                var currentImg = jQuery(".collection-img");
                var dataImg = jQuery(data).find(".collection-img");
                if (currentImg.find("p").length) {
                    if (dataImg.find("p").length) {
                        currentImg.html(dataImg.find("p"));
                    } else {
                        currentImg.find("p").hide();
                    }
                } else {
                    currentImg.html(dataImg.find("p"));
                }
            }

            //replace refined
            jQuery(".refined-widgets").replaceWith(jQuery(data).find(".refined-widgets"));
            
            //replace tags
            jQuery(".sidebar-block").replaceWith(jQuery(data).find(".sidebar-block"));
          
            //breadcrumb
           jQuery(".breadcrumb .br_title").replaceWith(jQuery(data).find(".breadcrumb .br_title"));
          
            furnitica.initColorSwatchGrid();
          
            //product review
            if (jQuery(".spr-badge").length > 0) {
                return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
            }
        },
        sidebarCreateUrl: function(baseLink) {
            var newQuery = jQuery.param(Shopify.queryParams).replace(/%2B/g, '+');
            if (baseLink) {
                //location.href = baseLink + "?" + newQuery;
                if (newQuery != "")
                    return baseLink + "?" + newQuery;
                else
                    return baseLink;
            }
            return location.pathname + "?" + newQuery;
        },
        sidebarAjaxClick: function(baseLink) {
            delete Shopify.queryParams.page;
            var newurl = furnitica.sidebarCreateUrl(baseLink);
            furnitica.isSidebarAjaxClick = true;
            History.pushState({
                param: Shopify.queryParams
            }, newurl, newurl);
            furnitica.sidebarGetContent(newurl);
        },
        sidebarGetContent: function(newurl) {
            jQuery.ajax({
                type: 'get',
                url: newurl,
                beforeSend: function() {
                    furnitica.showLoading();
                },
                success: function(data) {
                    furnitica.sidebarMapData(data);
                    furnitica.sidebarMapPaging();
                    furnitica.translateBlock(".main-content");
                    furnitica.sidebarMapTagEvents();
                    furnitica.sidebarInitToggle();
                    furnitica.sidebarMapClear();
                    furnitica.sidebarMapClearAll();
                    furnitica.ClearSelected();
                    furnitica.hideLoading();

                    furnitica.initQuickView();
                    furnitica.initAddToCart();
                    furnitica.initWishlist();
                    furnitica.initInfiniteScrolling();
                    furnitica.initScrollbar();
                },
                error: function(xhr, text) {
                    furnitica.hideLoading();
                    jQuery('.loading-modal').hide();
                    jQuery('.ajax-error-message').text(jQuery.parseJSON(xhr.responseText).description);
                    furnitica.showModal('.ajax-error-modal');
                }
            });
        },
        sidebarParams: function() {
            Shopify.queryParams = {};
            //get after ?...=> Object {q: "Acme"} 
            if (location.search.length) {
                for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
                    aKeyValue = aCouples[i].split('=');
                    if (aKeyValue.length > 1) {
                        Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
                    }
                }
            }
        },
        initMobileSidebar: function() {
            //if (jQuery(".header-mobile").is(":visible")) {
            jQuery('footer').append("<a class='option-sidebar left' id='displayTextLeft' href='javascript:void(0)' title='Show Sidebar'><span>Show Sidebar</span></a>");
            jQuery('#displayTextLeft').click(
                function(event) {
                    event.preventDefault();
                    if (jQuery('.sidebar').is(":hidden")) {
                        //jQuery('.col-main').fadeOut(800);
                        jQuery('.sidebar').fadeIn(800);
                        jQuery('body,html').animate({
                            scrollTop: 200
                        }, 600);
                        jQuery('#displayTextLeft').toggleClass('hidden-arrow-left');
                        jQuery('#displayTextLeft').attr('title', 'hide-sidebar');
                        jQuery('#displayTextLeft').html('<span>Hide Sidebar</span>');
                    } else {
                        jQuery('.sidebar').fadeOut(800);
                        jQuery('#displayTextLeft').removeClass('hidden-arrow-left');
                        jQuery('#displayTextLeft').attr('title', 'show-sidebar');
                        jQuery('#displayTextLeft').html('<span>Show Sidebar</span>');
                        //jQuery('.col-main').fadeIn(800);
                    }
                });
            //}
        },
        initSidebar: function() {
            //if category page then init sidebar
            if (jQuery(".collection-sidebar").length >= 0) {
                furnitica.sidebarParams();
                furnitica.initSortby();
                furnitica.sidebarMapEvents();
                furnitica.sidebarMapPaging();
                furnitica.sidebarInitToggle();
                furnitica.sidebarMapClear();
                furnitica.sidebarMapClearAll();
                furnitica.ClearSelected();
            }
          
          	jQuery(".sidebar-links.no-ajax li .caret").click(function(n)
            {
                var t = jQuery(this).parent();
                if (t.hasClass("click"))
                {
                    t.removeClass("click");
                }
                else
                {
                    t.addClass("click");
                }              
                n.preventDefault();
            });
        },
      	initMobileMenu: function() {
          if (jQuery(".menu-block").is(':visible')) {
                jQuery(".gf-menu-device-container ul.gf-menu li.dropdown").each(function() {
                    if (jQuery(this).find("> p.toogleClick").length == 0) {
                        jQuery(this).prepend('<p class="toogleClick">+</p>');
                    }
                });

                if (jQuery(".menu-block").children().hasClass("gf-menu-device-wrapper") == false) {
                    jQuery(".menu-block").children().addClass("gf-menu-device-wrapper");
                }
                if (jQuery(".gf-menu-device-container").find("ul.gf-menu").size() == 0) {
                    jQuery(".gf-menu-device-container").append(jQuery(".nav-bar .container").html());
                    jQuery(".gf-menu-device-container .site-nav").addClass("gf-menu");
                    jQuery(".gf-menu-device-container .site-nav").removeClass("nav")
                }
                jQuery("p.toogleClick").click(function() {
                    if (jQuery(this).hasClass("mobile-toggle-open")) {
                        jQuery(this).next().next().hide();
                        jQuery(this).removeClass("mobile-toggle-open");
                    } else {
                        jQuery(this).next().next().show();
                        jQuery(this).addClass("mobile-toggle-open")
                    }
                });
               var w = window.innerWidth;
                  if (w < 1024) {
                    jQuery('.site-nav .dropdown .menu__moblie').bind('click', function(event) {
                      if (currentEl != this) {
                        jQuery(this).next().show();
                        jQuery(this).prev().addClass('mobile-toggle-open');
                        event.preventDefault();
                        currentEl = this;
                      }
                    });
                  }
                jQuery("p.toogleClick").show();
                jQuery("div.gf-menu-toggle").hide();
                jQuery(".nav-bar .container").hide();
                if (jQuery("ul.gf-menu").hasClass("clicked") == false) {
                    jQuery(".gf-menu").hide();
                    jQuery(".gf-menu li.dropdown ul.site-nav-dropdown").hide();
                }


                jQuery(".col-1 .inner ul.dropdown").parent().each(function() {
                    if (jQuery(this).find("> p.toogleClick").length == 0) {
                        jQuery(this).prepend('<p class="toogleClick">+</p>');
                    }
                });

                jQuery(".cbp-spmenu span.icon-dropdown").remove();

                jQuery("ul.gf-menu li.dropdown").each(function() {
                    if (jQuery(this).find("> p.toogleClick").length == 0) {
                        jQuery(this).prepend('<p class="toogleClick">+</p>');
                    }
                });
            

                jQuery("p.toogleClick").click(function() {
                    if (jQuery(this).hasClass("mobile-toggle-open")) {
                        jQuery(this).next().next().hide();
                        jQuery(this).removeClass("mobile-toggle-open");
                       jQuery(this).text('+');
                    } else {
                        jQuery(this).next().next().show();
                        jQuery(this).addClass("mobile-toggle-open");
                      jQuery(this).text('-');
                    }
                });

            } else {
                jQuery(".nav-bar .container").show();
                jQuery(".gf-menu").hide();
				
            }
            if (jQuery(".menu-block").children().hasClass("gf-menu-device-wrapper") == false) {
                jQuery(".menu-block").children().addClass("resized");
            };
          if (jQuery('.header-mobile').is(':visible')) {            
            // jQuery('.header-search').appendTo(jQuery('.search-mobile'));
            jQuery('.lang-block').appendTo(jQuery('.opt-area'));
            jQuery('.currency').appendTo(jQuery('.opt-area'));                
          }else {
            jQuery('.lang-block').prependTo(jQuery('.right-header-top'));
            jQuery('.currency').prependTo(jQuery('.right-header-top'));
          }
        },

        //opt header

        closeDropdownOpt: function() {
          if (jQuery('.opt-area .dropdown-menu').is(':visible')) {
            jQuery('.opt-area .dropdown-menu').slideUp('fast');
          }
        },

        initDropdownOpt: function() {
          if (jQuery('.header-mobile').is(':visible')) {
            jQuery('.lang-block').appendTo(jQuery('.opt-area .dropdown-menu'));
            jQuery('.currency').appendTo(jQuery('.opt-area .dropdown-menu'));
            jQuery('.opt-area .fa-cog').click(function(){                
              if (jQuery('.opt-area .dropdown-menu').is(':visible')) {
                jQuery('.opt-area .dropdown-menu').slideUp('fast');
              } else {
                jQuery('.opt-area .dropdown-menu').slideDown('fast');
              }
            })
          } else {
            jQuery('.lang-block').appendTo(jQuery('.header-panel-top .container'));
            jQuery('.currency').appendTo(jQuery('.header-panel-top .container'));
          }

          jQuery('.opt-area .fa-cog').click(function(){
            furnitica.closeDropdownCart();
          })


          jQuery('#cartToggle').click(function(){
            furnitica.closeDropdownOpt();
          })
        },
        closeDropdownAccount: function() {
            if (jQuery('.customer-area').hasClass('open')) {
                jQuery('.customer-area').removeClass('open');
            }
        },
        initDropdownAccount: function() {
            if (jQuery('.header-mobile').is(':visible')) {
                jQuery('.lang-block').appendTo(jQuery('.customer-area .dropdown'));
                jQuery('.currency').appendTo(jQuery('.customer-area .dropdown'));
            } else {
              	jQuery('.lang-block').prependTo(jQuery('.header-panel .pull-left'));
                jQuery('.currency').prependTo(jQuery('.header-panel .pull-left'));
            }
          
            jQuery('.customer-area > a').click(function(){              
                if (jQuery(this).parent().hasClass('open')) {
                    jQuery(this).parent().removeClass('open');
                } else {
                    jQuery(this).parent().addClass('open');
                }
            })

            jQuery('#cartToggle').click(function(){
                furnitica.closeDropdownAccount();
            });
        },
        initWishlist: function() {
            jQuery('.grid-item button.wishlist').click(function(e) {
                e.preventDefault();
                var form = jQuery(this).parent();
                var item = form.parents('.grid-item');
                jQuery.ajax({
                    type: 'POST',
                    url: '/contact',
                    data: form.serialize(),
                    beforeSend: function() {
                        furnitica.showLoading();
                    },
                    success: function(data) {
                        furnitica.hideLoading();
                        form.html('<a class="wishlist" href="/pages/wish-list" title="Go to wishlist"><span class="icon"></span><span>Go to wishlist</span></a>');
                        var title = item.find('.product-title').html();
                        var image = item.find('a > img').attr('src');
                        jQuery('.ajax-success-modal').find('.ajax-product-title').html(title);
                        jQuery('.ajax-success-modal').find('.ajax-product-image').attr('src', image);
                        jQuery('.ajax-success-modal').find('.btn-go-to-wishlist').show();
                        jQuery('.ajax-success-modal').find('.btn-go-to-cart').hide();
                        furnitica.showModal('.ajax-success-modal');
                    },
                    error: function(xhr, text) {
                        furnitica.hideLoading();
                        jQuery('.loading-modal').hide();
                        jQuery('.ajax-error-message').text(jQuery.parseJSON(xhr.responseText).description);
                        furnitica.showModal('.ajax-error-modal');
                    }
                });
            });
        },
        initProductWishlist: function() {
            jQuery('.product button.wishlist').click(function(e) {
                e.preventDefault();
                var form = jQuery(this).parent();
                var item = form.parents('.grid-item');
                jQuery.ajax({
                    type: 'POST',
                    url: '/contact',
                    data: form.serialize(),
                    beforeSend: function() {
                        furnitica.showLoading();
                    },
                    success: function(data) {
                        furnitica.hideLoading();
                        form.html('<a class="wishlist" href="/pages/wish-list" title="Go to wishlist"><span class="icon"></span><span>Go to wishlist</span></a>');
                        var title = jQuery('.product-title h2').html();
                        var image = jQuery('#product-featured-image').attr('src');
                        jQuery('.ajax-success-modal').find('.ajax-product-title').html(title);
                        jQuery('.ajax-success-modal').find('.ajax-product-image').attr('src', image);
                        jQuery('.ajax-success-modal').find('.btn-go-to-wishlist').show();
                        jQuery('.ajax-success-modal').find('.btn-go-to-cart').hide();
                        furnitica.showModal('.ajax-success-modal');
                    },
                    error: function(xhr, text) {
                        furnitica.hideLoading();
                        jQuery('.loading-modal').hide();
                        jQuery('.ajax-error-message').text(jQuery.parseJSON(xhr.responseText).description);
                        furnitica.showModal('.ajax-error-modal');
                    }
                });
            });
        },
        initRemoveWishlist: function() {
            jQuery('.btn-remove-wishlist').click(function(e) {
                var row = jQuery(this).parents('tr');
                var tagID = row.find('.tag-id').val();
                var form = jQuery('#remove-wishlist-form');
                form.find("input[name='contact[tags]']").val('x' + tagID);
                jQuery.ajax({
                    type: 'POST',
                    url: '/contact',
                    data: form.serialize(),
                    beforeSend: function() {
                        furnitica.showLoading();
                    },
                    success: function(data) {
                        furnitica.hideLoading();
                        row.fadeOut(1000);
                    },
                    error: function(xhr, text) {
                        furnitica.hideLoading();
                        jQuery('.loading-modal').hide();
                        jQuery('.ajax-error-message').text(jQuery.parseJSON(xhr.responseText).description);
                        furnitica.showModal('.ajax-error-modal');
                    }
                });
            });
        },
        initColorSwatchGrid: function() { 
          jQuery('.item-swatch li label').hover(function(){
            var newImage = jQuery(this).parent().find('.hidden a').attr('href');
            jQuery(this).parents('.grid-item').find('.product-grid-image img').attr({ src: newImage }); 
            return false;
          });
        },
        initResizeImage: function() {
            if (window.product_image_resize) {
                jQuery('.products-grid .product-image img').fakecrop({
                    fill: window.images_size.is_crop,
                    widthSelector: ".products-grid .grid-item .product-image",
                    ratioWrapper: window.images_size
                });
            }
        },
        initInfiniteScrolling: function() {
            if (jQuery('.infinite-scrolling').length > 0) {
                jQuery('.infinite-scrolling a').click(function(e) {
                    e.preventDefault();
                    if (!jQuery(this).hasClass('disabled')) {
                        furnitica.doInfiniteScrolling();
                    }
                });
            }
        },
        doInfiniteScrolling: function() {
            var currentList = jQuery('.block-row .products-grid');
            if (!currentList.length) {
                currentList = jQuery('.block-row .product-list');
            }
            if (currentList) {
                var showMoreButton = jQuery('.infinite-scrolling a').first();
                jQuery.ajax({
                    type: 'GET',
                    url: showMoreButton.attr("href"),
                    beforeSend: function() {
                        furnitica.showLoading();
                        jQuery('.loading-modal').show();
                    },
                    success: function(data) {
                        furnitica.hideLoading();
                        var products = jQuery(data).find(".block-row .products-grid");
                        if (!products.length) {
                            products = jQuery(data).find(".block-row .product-list");
                        }
                        if (products.length) {
                            if (products.hasClass('products-grid')) {
                                /*fake crop*/
                                if (window.product_image_resize) {
                                    products.children().find('img').fakecrop({
                                        fill: window.images_size.is_crop,
                                        widthSelector: ".products-grid .grid-item .product-image",
                                        ratioWrapper: window.images_size
                                    });
                                }
                            }

                            currentList.append(products.children());
                            furnitica.translateBlock("." + currentList.attr("class"));
                            furnitica.initQuickView();
                            furnitica.initAddToCart();
                            furnitica.initWishlist();
                            //get link of Show more
                            if (jQuery(data).find('.infinite-scrolling').length > 0) {
                                showMoreButton.attr('href', jQuery(data).find('.infinite-scrolling a').attr('href'));
                            } else {
                                //no more products
                                showMoreButton.hide();
                                showMoreButton.next().show();
                            }
                          
                          	//currency
                            if (window.show_multiple_currencies && window.shop_currency != jQuery("#currencies").val())
                            {
                                Currency.convertAll(window.shop_currency, jQuery("#currencies").val(), "span.money", "money_format")
                            }
                          
                            furnitica.initColorSwatchGrid();
                          
                            //product review
                            if (jQuery(".spr-badge").length > 0) {
                                return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                            }
                        }
                    },
                    error: function(xhr, text) {
                        furnitica.hideLoading();
                        jQuery('.loading-modal').hide();
                        jQuery('.ajax-error-message').text(jQuery.parseJSON(xhr.responseText).description);
                        furnitica.showModal('.ajax-error-modal');
                    },
                    dataType: "html"
                });
            }
        },
        closeEmailModalWindow: function() {
            if (jQuery('#email-modal').length > 0 && jQuery('#email-modal').is(':visible')) {
                jQuery('#email-modal .modal-window').fadeOut(600, function() {
                    jQuery('#email-modal .modal-overlay').fadeOut(600, function() {
                        jQuery('#email-modal').hide();
                        Cookies.set('emailSubcribeModal', 'closed', {
                            expires: 1,
                            path: '/'
                        });
                    });
                });
            }
        },
        showModal: function(selector) {
            jQuery(selector).fadeIn(500)
            furnitica.furniticaTimeout = setTimeout(function() {
                jQuery(selector).fadeOut(500);
            }, 5000);
        },
        initToggleCollectionPanel: function() {
            if (jQuery('.collection-sharing-btn').length > 0) {
                jQuery('.collection-sharing-btn').click(function() {
                    jQuery('.collection-sharing-panel').toggle();
                    if (jQuery('.collection-sharing-panel').is(':visible')) {
                        jQuery('.collection-sharing-btn').addClass('btn-hover');
                        jQuery('.collection-filter-panel').hide();
                        jQuery('.collection-filter-btn').removeClass('btn-hover');
                    } else {
                        jQuery('.collection-sharing-btn').removeClass('btn-hover');
                    }
                });
            }
            if (jQuery('.collection-filter-btn').length > 0) {
                jQuery('.collection-filter-btn').click(function() {
                    jQuery('.collection-filter-panel').toggle();
                    if (jQuery('.collection-filter-panel').is(':visible')) {
                        jQuery('.collection-filter-btn').addClass('btn-hover');
                        jQuery('.collection-sharing-panel').hide();
                        jQuery('.collection-sharing-btn').removeClass('btn-hover');
                    } else {
                        jQuery('.collection-filter-btn').removeClass('btn-hover');
                    }
                });
                jQuery('.collection-filter-panel select').change(function(index) {
                    window.location = jQuery(this).find('option:selected').val();
                });
            }
        },
        checkItemsInDropdownCart: function() {
            if (jQuery('#dropdown-cart .mini-products-list').children().length > 0) {
                //Has item in dropdown cart
                jQuery('#dropdown-cart .no-items').hide();
                jQuery('#dropdown-cart .has-items').show();
            } else {
                //No item in dropdown cart                
                jQuery('#dropdown-cart .has-items').hide();
                jQuery('#dropdown-cart .no-items').show();
            }
        },
        initModal: function() {
            jQuery('.continue-shopping').click(function() {
                clearTimeout(furnitica.furniticaTimeout);
                jQuery('.ajax-success-modal').fadeOut(500);
            });
            jQuery('.close-modal, .overlay').click(function() {
                clearTimeout(furnitica.furniticaTimeout);
                jQuery('.ajax-success-modal').fadeOut(500);
            });
        },
        initDropDownCart: function() {
            if (window.dropdowncart_type == "click") {
                //click type  
                jQuery('#cartToggle').click(function() {
                    if (jQuery('#dropdown-cart').is(':visible')) {
                        jQuery("#dropdown-cart").slideUp('fast');
                    } else {
                        jQuery("#dropdown-cart").slideDown('fast');
                    }
                });
            } else {
                //hover type
                if (!('ontouchstart' in document)) {
                    jQuery('#cartToggle').hover(function() {
                        if (!jQuery('#dropdown-cart').is(':visible')) {
                            jQuery("#dropdown-cart").slideDown('fast');
                        }
                    });
                    jQuery('.wrapper-top-cart').mouseleave(function() {
                        jQuery("#dropdown-cart").slideUp('fast');
                    });
                } else {
                    //mobile
                    jQuery('#cartToggle').click(function() {
                        if (jQuery('#dropdown-cart').is(':visible')) {
                            jQuery("#dropdown-cart").slideUp('fast');
                        } else {
                            jQuery("#dropdown-cart").slideDown('fast');
                        }
                    });
                }
            }

            furnitica.checkItemsInDropdownCart();

            jQuery('#dropdown-cart .no-items a').click(function() {
                jQuery("#dropdown-cart").slideUp('fast');
            });

            jQuery('#dropdown-cart .btn-remove').click(function(event) {
                event.preventDefault();
                var productId = jQuery(this).parents('.item').attr('id');
                productId = productId.match(/\d+/g);
                Shopify.removeItem(productId, function(cart) {
                    furnitica.doUpdateDropdownCart(cart);
                });
            });
        },
        closeDropdownCart: function() {
            if (jQuery('#dropdown-cart').is(':visible')) {
                jQuery("#dropdown-cart").slideUp('fast');
            }
        },
        initDropdownSearch: function() {
          jQuery('.have-fixed .nav-search .icon-search').click(function() {
            if (jQuery('.have-fixed .nav-search .search-bar').is(':visible')) {
              jQuery('.have-fixed .nav-search .search-bar').slideUp('fast');
            } else {
              jQuery('.have-fixed .nav-search .search-bar').slideDown('fast');
            }
          });
        },
        closeDropdownSearch: function() {
          if (jQuery(".have-fixed .nav-search .search-bar").is(":visible")) {
            jQuery(".have-fixed .nav-search .search-bar").slideUp("fast");
          }
        },
        initProductMoreview: function() {
            if (jQuery('.more-view.horizontal').length > 0) {
                this.initOwlMoreview();
            } else if (jQuery('.more-view.vertical').length > 0) {
                this.initJcarouselMoreview();
            }
        },
        initOwlMoreview: function() {  
            jQuery('.more-view.horizontal ul').owlCarousel({
                pagination: false,
                navigation: true,
              	items : 5,
                itemsDesktop: [1199, 5],
                itemsDesktopSmall: [979, 4],
                itemsTablet: [767, 4],
                itemsTabletSmall: [540, 5],
                itemsMobile: [450, 4]
            });
        },
        initJcarouselMoreview: function() {
            jQuery('.more-view.vertical ul').jcarousel({
                vertical: true
            });
            if (jQuery("#product-featured-image").length > 0) {
              var height_moreview = jQuery("#product-featured-image").height();
              jQuery('.more-view.vertical').css('height',height_moreview + 'px');
            }
        },
        initCloudzoom: function() {
            if (jQuery("#product-featured-image").length > 0) {
                if (jQuery(".visible-phone").is(":visible")) {
                    //mobile display
                    jQuery("#product-featured-image").elevateZoom({
                        gallery: 'more-view-carousel',
                        cursor: 'pointer',
                        galleryActiveClass: 'active',
                        imageCrossfade: false,
                        scrollZoom: false,
                        onImageSwapComplete: function() {
                            jQuery(".zoomWrapper div").hide();
                        },
                        loadingIcon: window.loading_url
                    });
                    jQuery("#product-featured-image").bind("click", function(e) {
                        return false;
                    });
                } else {
                    jQuery("#product-featured-image").elevateZoom({
                        gallery: 'more-view-carousel',
                        cursor: 'pointer',
                        galleryActiveClass: 'active',
                        imageCrossfade: true,
                        scrollZoom: true,
                        onImageSwapComplete: function() {
                            jQuery(".zoomWrapper div").hide();
                        },
                        loadingIcon: window.loading_url
                    });

                    jQuery("#product-featured-image").bind("click", function(e) {
                        var ez = jQuery('#product-featured-image').data('elevateZoom');
                        jQuery.fancybox(ez.getGalleryList());
                        return false;
                    });
                }
            }
        },
        initScrollTop: function() {
            jQuery('#back-top').click(function() {
                jQuery('body,html').animate({
                    scrollTop: 0
                }, 400);
                return false;
            });
        },
        initProductAddToCart: function() {
            if (jQuery('#product-add-to-cart').length > 0) {
                jQuery('#product-add-to-cart').click(function(event) {
                    event.preventDefault();
                    if (jQuery(this).attr('disabled') != 'disabled') {
                        if (!window.ajax_cart) {
                            jQuery(this).closest('form').submit();
                        } else {
                            var variant_id = jQuery('#add-to-cart-form select[name=id]').val();
                            if (!variant_id) {
                                variant_id = jQuery('#add-to-cart-form input[name=id]').val();
                            }
                            var quantity = jQuery('#add-to-cart-form input[name=quantity]').val();
                            if (!quantity) {
                                quantity = 1;
                            }
                            var title = jQuery('.product-title h1 .lang1').text();
                            var image = jQuery('#product-featured-image').attr('src');
                            furnitica.doAjaxAddToCart(variant_id, quantity, title, image);
                        }
                    }
                    return false;
                });
            }
        },
        initAddToCart: function() {
            if (jQuery('.add-to-cart-btn').length > 0) {
                jQuery('.add-to-cart-btn').click(function(event) {
                    event.preventDefault();
                    if (jQuery(this).attr('disabled') != 'disabled') {
                        var productItem = jQuery(this).parents('.product-item');
                        var productId = jQuery(productItem).attr('id');
                        productId = productId.match(/\d+/g);
                        if (!window.ajax_cart) {
                            jQuery('#product-actions-' + productId).submit();
                        } else {
                            var variant_id = jQuery('#product-actions-' + productId + ' select[name=id]').val();
                            if (!variant_id) {
                                variant_id = jQuery('#product-actions-' + productId + ' input[name=id]').val();
                            }
                            var quantity = jQuery('#product-actions-' + productId + ' input[name=quantity]').val();
                            if (!quantity) {
                                quantity = 1;
                            }
                            var title = jQuery(productItem).find('.product-title').html();
                            var image = jQuery(productItem).find('.product-grid-image img').attr('src');
                            furnitica.doAjaxAddToCart(variant_id, quantity, title, image);
                        }
                    }
                    return false;
                });
            }
        },
        showLoading: function() {
            jQuery('.loading-modal').show();
        },
        hideLoading: function() {
            jQuery('.loading-modal').hide();
        },
        doAjaxAddToCart: function(variant_id, quantity, title, image) {
            jQuery.ajax({
                type: "post",
                url: "/cart/add.js",
                // data: 'quantity=' + quantity + '&id=' + variant_id,
                data: jQuery("input[value="+variant_id+"]").closest("form[action='/cart/add']").serialize(),
                dataType: 'json',
                beforeSend: function() {
                    furnitica.showLoading();
                },
                success: function(msg) {
                    furnitica.hideLoading();
                    jQuery('.ajax-success-modal').find('.ajax-product-title').html(furnitica.translateText(title));
                    jQuery('.ajax-success-modal').find('.ajax-product-image').attr('src', image);
                    jQuery('.ajax-success-modal').find('.btn-go-to-wishlist').hide();
                    jQuery('.ajax-success-modal').find('.btn-go-to-cart').show();

                    furnitica.showModal('.ajax-success-modal');
                    furnitica.updateDropdownCart();
                },
                error: function(xhr, text) {
                    furnitica.hideLoading();
                    jQuery('.ajax-error-message').text(jQuery.parseJSON(xhr.responseText).description);
                    furnitica.showModal('.ajax-error-modal');
                }
            });
        },
        initQuickView: function() {
            jQuery('.quickview-button a').click(function() {
                var product_handle = jQuery(this).attr('id');
                Shopify.getProduct(product_handle, function(product) {
                    var template = jQuery('#quickview-template').html();
                    jQuery('.quick-view').html(template);
                    var quickview = jQuery('.quick-view');

                    quickview.find('.product-title a').html(furnitica.translateText(product.title));
                    quickview.find('.product-title a').attr('href', product.url);
                    if (quickview.find('.sample-vendor > span').length > 0) {
                        quickview.find('.sample-vendor > span').text(product.vendor);
                    }
                    if (quickview.find('.product-vendor > span').length > 0) {
                        quickview.find('.product-vendor > span').text(product.vendor);
                    }
                    if (quickview.find('.product-type > span').length > 0) {
                        quickview.find('.product-type > span').text(product.type);
                    }
                    if (quickview.find('.variant-sku > span').length > 0) {
                          quickview.find('.variant-sku > span').text(product.sku);
                    }	
                    if (quickview.find('.product-inventory > span').length > 0) {
                      var variant = product.variants[0];
                      var inventoryInfo = quickview.find('.product-inventory > span');                      
                      if (variant.available) {
                        if (variant.inventory_management!=null) {
                          inventoryInfo.text(window.inventory_text.in_stock);
                        } else {
                          inventoryInfo.text(window.inventory_text.many_in_stock);
                        }
                      } else {
                        inventoryInfo.text(window.inventory_text.out_of_stock);
                      }
                    }
                    //countdown for quickview
                    
 					if(product.description != null) {
                    if (product.description.indexOf("[countdown]") > 0) {
                        var countdownTime = product.description.match(/\[countdown\](.*)\[\/countdown\]/);
                        if (countdownTime && countdownTime.length > 0) {
                            quickview.find(".countdown").show();
                            quickview.find(".quickview-clock").countdown(countdownTime[1], function(event) {
                                jQuery(this).html(event.strftime('%Dd %H:%M:%S'));
                            });
                        }
                    }else{quickview.find('.countdown').remove();}
                    if (quickview.find('.short-description').length > 0) {
                        var ahihi = product.description.replace(/(<([^>]+)>)/ig, "");
                        var ahoho = ahihi.replace(/\[countdown\](.*)\[\/countdown\]/g, "");
                        var description = ahoho.replace(/\[custom-tab\](.*)([^>]+)(.*)\[\/custom-tab\]/g, "");
                        if (window.multi_lang) {
                          if (description.indexOf("[lang2]") > 0) {
                            var descList = description.split("[lang2]");
                            if (jQuery.cookie("language") != null) {
                                description = descList[translator.current_lang - 1];
                            } else {
                                description = descList[0];
                            }
                          }
                        }
                        description = description.split(" ").splice(0, 30).join(" ") + "...";
                        quickview.find('.short-description').text(description);
                    } else {
                        quickview.find('.short-description').remove();
                    }
                  }

                    quickview.find('.price').html(Shopify.formatMoney(product.price, window.money_format));
                    quickview.find('.product-item').attr('id', 'product-' + product.id);
                    quickview.find('.variants').attr('id', 'product-actions-' + product.id);
                  
                  quickview.find('.product-img-box').attr('id', 'product-' + product.id);
                  
                    quickview.find('.variants select').attr('id', 'product-select-' + product.id);
                  
                  // review
                  	var in_fo = jQuery('#product-'+ product.id +' .spr-badge').html();
          	 		jQuery('#product-'+ product.id +' .re_view').html(in_fo);
					
                   // Sold Out 
                  

                  	var in_fo = jQuery('#product-'+ product.id +' .product-label').html();
          	 		jQuery('#product-'+ product.id +' .product-label-qiuck').html(in_fo);
                  
                  
                    //if has compare price
                    if (product.compare_at_price > product.price) {
                        quickview.find('.compare-price').html(Shopify.formatMoney(product.compare_at_price_max, window.money_format)).show();
                        quickview.find('.price').addClass('on-sale');
                    } else {
                        quickview.find('.compare-price').remove();
                        quickview.find('.price').removeClass('on-sale');
                    }

                    //out of stock
                    if (!product.available) {
                        quickview.find("select, input, .total-price, .dec, .inc, .variants label, .extra").remove();
                        quickview.find(".add-to-cart-btn").text(window.inventory_text.unavailable).addClass('disabled').attr("disabled", "disabled");;
                    } else {
                        quickview.find('.total-price span').html(Shopify.formatMoney(product.price, window.money_format));
                        if (window.use_color_swatch) {
                            furnitica.createQuickViewVariantsSwatch(product, quickview);
                        } else {
                            furnitica.createQuickViewVariants(product, quickview);
                        }
                    }

                    //quantity
                    quickview.find(".button").on("click", function() {
                        var oldValue = quickview.find(".quantity").val(),
                            newVal = 1;
                        if (jQuery(this).text() == "+") {
                            newVal = parseInt(oldValue) + 1;
                        } else if (oldValue > 1) {
                            newVal = parseInt(oldValue) - 1;
                        }
                        quickview.find(".quantity").val(newVal);

                        if (quickview.find(".total-price").length > 0) {
                            furnitica.updatePricingQuickview();
                        }
                    });

                    if (window.show_multiple_currencies) {
                        Currency.convertAll(window.shop_currency, jQuery('#currencies').val(), 'span.money', 'money_format');
                    }

                    furnitica.loadQuickViewSlider(product, quickview);
                    furnitica.initQuickviewAddToCart();
                    furnitica.translateBlock(".quick-view");

                    jQuery('.quick-view').fadeIn(500);
                    if (jQuery('.quick-view .total-price').length > 0) {
                        jQuery('.quick-view input[name=quantity]').on('change', furnitica.updatePricingQuickview);
                    }
                });

                return false;
            });

            jQuery(document).on("click", ".quick-view .overlay, .close-window", function() {
                furnitica.closeQuickViewPopup();
                return false;
            });
        },
        updatePricingQuickview: function() {
            //try pattern one before pattern 2
            var regex = /([0-9]+[.|,][0-9]+[.|,][0-9]+)/g;
            var unitPriceTextMatch = jQuery('.quick-view .price').text().match(regex);

            if (!unitPriceTextMatch) {
                regex = /([0-9]+[.|,][0-9]+)/g;
                unitPriceTextMatch = jQuery('.quick-view .price').text().match(regex);
            }

            if (unitPriceTextMatch) {
                var unitPriceText = unitPriceTextMatch[0];
                var unitPrice = unitPriceText.replace(/[.|,]/g, '');
                var quantity = parseInt(jQuery('.quick-view input[name=quantity]').val());
                var totalPrice = unitPrice * quantity;

                var totalPriceText = Shopify.formatMoney(totalPrice, window.money_format);
                regex = /([0-9]+[.|,][0-9]+[.|,][0-9]+)/g;     
                if (!totalPriceText.match(regex)) {
                   regex = /([0-9]+[.|,][0-9]+)/g;
                } 
                totalPriceText = totalPriceText.match(regex)[0];

                var regInput = new RegExp(unitPriceText, "g");
                var totalPriceHtml = jQuery('.quick-view .price').html().replace(regInput, totalPriceText);

                jQuery('.quick-view .total-price span').html(totalPriceHtml);
            }
        },
        initQuickviewAddToCart: function() {
            if (jQuery('.quick-view .add-to-cart-btn').length > 0) {
                jQuery('.quick-view .add-to-cart-btn').click(function() {
                    var variant_id = jQuery('.quick-view select[name=id]').val();
                    if (!variant_id) {
                        variant_id = jQuery('.quick-view input[name=id]').val();
                    }
                    var quantity = jQuery('.quick-view input[name=quantity]').val();
                    if (!quantity) {
                        quantity = 1;
                    }

                    var title = jQuery('.quick-view .product-title a').html();
                    var image = jQuery('.quick-view .quickview-featured-image img').attr('src');
                    furnitica.doAjaxAddToCart(variant_id, quantity, title, image);
                    furnitica.closeQuickViewPopup();
                });
            }
        },
        updateDropdownCart: function() {
            Shopify.getCart(function(cart) {
                furnitica.doUpdateDropdownCart(cart);
            });
        },
        doUpdateDropdownCart: function(cart) {
            var template = '<li class="item" id="cart-item-{ID}"><a href="{URL}" title="{TITLE}" class="product-image"><img src="{IMAGE}" alt="{TITLE}"></a><div class="product-details"><a href="javascript:void(0)" title="Remove This Item" class="btn-remove">X</a><p class="product-name"><a href="{URL}">{TITLE}</a></p><div class="cart-collateral"><span class="price">{PRICE}</span> x {QUANTITY}</div></div></li>';

            jQuery('#cartCount').text(cart.item_count);
            /*Total price*/
            jQuery('#dropdown-cart .summary .price').html(Shopify.formatMoney(cart.total_price, window.money_format));
            /*Clear cart*/
            jQuery('#dropdown-cart .mini-products-list').html('');
            /*Add product to cart*/
            if (cart.item_count > 0) {
                for (var i = 0; i < cart.items.length; i++) {
                    var item = template;
                    item = item.replace(/\{ID\}/g, cart.items[i].id);
                    item = item.replace(/\{URL\}/g, cart.items[i].url);
                    item = item.replace(/\{TITLE\}/g, furnitica.translateText(cart.items[i].title));
                    item = item.replace(/\{QUANTITY\}/g, cart.items[i].quantity);
                    item = item.replace(/\{IMAGE\}/g, Shopify.resizeImage(cart.items[i].image, 'small'));
                    item = item.replace(/\{PRICE\}/g, Shopify.formatMoney(cart.items[i].price, window.money_format));
                    jQuery('#dropdown-cart .mini-products-list').append(item);
                }
                jQuery('#dropdown-cart .btn-remove').click(function(event) {
                    event.preventDefault();
                    var productId = jQuery(this).parents('.item').attr('id');
                    productId = productId.match(/\d+/g);
                    Shopify.removeItem(productId, function(cart) {
                        furnitica.doUpdateDropdownCart(cart);
                    });
                });
                if (furnitica.checkNeedToConvertCurrency()) {
                    Currency.convertAll(window.shop_currency, jQuery('#currencies').val(), '#dropdown-cart span.money', 'money_format');
                }
            }
            furnitica.checkItemsInDropdownCart();
        },
        checkNeedToConvertCurrency: function() {
            return window.show_multiple_currencies && Currency.currentCurrency != shopCurrency;
        },
        loadQuickViewSlider: function(product, quickviewTemplate) {
          var featuredImage = Shopify.resizeImage(product.featured_image, 'grande');
          quickviewTemplate.find('.quickview-featured-image').append('<a href="' + product.url + '"><img src="' + featuredImage + '" title="' + product.title + '"/><div style="height: 100%; width: 100%; top:0; left:0 z-index: 2000; position: absolute; display: none; background: url(' + window.loading_url + ') 50% 50% no-repeat;"></div></a>');
// 		  quickviewTemplate.find('.rating').attr('data-id', product.id);
          quickviewTemplate.find('.product-label strong.new').append(product.tags);
            if (product.images.length > 1) {
                var quickViewCarousel = quickviewTemplate.find('.quick-view-more-view ul');
                var count = 0;
                for (i in product.images) {
                  if (count < product.images.length) {
                    var grande = Shopify.resizeImage(product.images[i], 'grande');
                    var compact = Shopify.resizeImage(product.images[i], 'compact');
                    var item = '<li><a href="javascript:void(0)" data-image="' + grande + '"><img src="' + compact + '"  /></a></li>'

                    quickViewCarousel.append(item);
                    count = count + 1;
                  }
                }

                quickViewCarousel.find('a').click(function() {
                    var quickViewFeatureImage = quickviewTemplate.find('.quickview-featured-image img');
                    var quickViewFeatureLoading = quickviewTemplate.find('.quickview-featured-image div');
                    if (quickViewFeatureImage.attr('src') != jQuery(this).attr('data-image')) {
                        quickViewFeatureImage.attr('src', jQuery(this).attr('data-image'));
                        quickViewFeatureLoading.show();
                        quickViewFeatureImage.load(function(e) {
                            quickViewFeatureLoading.hide();
                            jQuery(this).unbind('load');
                            quickViewFeatureLoading.hide();
                        });
                    }
                });
                if (quickViewCarousel.parent().hasClass("horizontal")) {
                    furnitica.initQuickViewCarousel(quickViewCarousel);
                } else {
                    furnitica.initQuickViewVerticalMoreview(quickViewCarousel);
                }
            } else {
                quickviewTemplate.find('.quickview-more-views').remove();
            }

        },
        initQuickViewCarousel: function(quickViewCarousel) {
            if (quickViewCarousel) {
                quickViewCarousel.owlCarousel({
                    pagination: false,
                    navigation: true,
                    items: 5,
                    itemsDesktop: [1199, 4],
                    itemsDesktopSmall: [979, 3],
                    itemsTablet: [768, 3],
                    itemsTabletSmall: [540, 3],
                    itemsMobile: [360, 3]
                });
            }
        },
        initQuickViewVerticalMoreview: function(quickViewCarousel) {
            if (quickViewCarousel) {
                if (jQuery(".quick-view-more-view.vertical ul").children().length > 3) {
                  jQuery(".quick-view-more-view").niceScroll({
                    cursoropacitymin: 1,
                    cursorborder:"",
                    cursorwidth: "5px",
                    cursorcolor:"#d2d2d2",
                    cursorborderradius:0,
                    background: "#ebebeb"
                  });
                }
              
                jQuery('.product-img-box').addClass('has-jcarousel');
            }
        },
        convertToSlug: function(text) {
            return text
                .toLowerCase()
                .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
        },
        createQuickViewVariantsSwatch: function(product, quickviewTemplate) {
            if (product.variants.length > 1) { //multiple variants
                for (var i = 0; i < product.variants.length; i++) {
                    var variant = product.variants[i];
                    var option = '<option value="' + variant.id + '">' + variant.title + '</option>';
                    quickviewTemplate.find('form.variants > select').append(option);
                }
                new Shopify.OptionSelectors("product-select-" + product.id, {
                    product: product,
                    onVariantSelected: selectCallbackQuickview
                });

                //start of quickview variant;
                var filePath = window.file_url.substring(0, window.file_url.lastIndexOf('?'));
                var assetUrl = window.asset_url.substring(0, window.asset_url.lastIndexOf('?'));
                var options = "";
                for (var i = 0; i < product.options.length; i++) {
                    options += '<div class="swatch clearfix" data-option-index="' + i + '">';
                    options += '<div class="header">' + product.options[i].name + '<span>*</span></div>';
                    var is_color = false;
                    if (/Color|Colour/i.test(product.options[i].name)) {
                        is_color = true;
                    }
                    var optionValues = new Array();
                    for (var j = 0; j < product.variants.length; j++) {
                        var variant = product.variants[j];
                        var value = variant.options[i];
                        var valueHandle = this.convertToSlug(value);
                        var forText = 'swatch-' + i + '-' + valueHandle;
                        if (optionValues.indexOf(value) < 0) {
                            //not yet inserted
                            options += '<div data-value="' + value + '" class="swatch-element ' + (is_color ? "color" : "") + valueHandle + (variant.available ? ' available ' : ' soldout ') + '">';

                            if (is_color) {
                                options += '<div class="tooltip">' + value + '</div>';
                            }
                            options += '<input id="' + forText + '" type="radio" name="option-' + i + '" value="' + value + '" ' + (j == 0 ? ' checked ' : '') + (variant.available ? '' : ' disabled') + ' />';

                            if (is_color) {
                                options += '<label for="' + forText + '" style="background-color: ' + valueHandle + '; background-image: url(' + filePath + valueHandle + '.png)"><img class="crossed-out" src="' + assetUrl +'" /></label>';
                            } else {
                                options += '<label for="' + forText + '">' + value + '<img class="crossed-out" src="' + assetUrl + '" /></label>';
                            }
                            options += '</div>';
                            if (variant.available) {
                                jQuery('.quick-view .swatch[data-option-index="' + i + '"] .' + valueHandle).removeClass('soldout').addClass('available').find(':radio').removeAttr('disabled');
                            }
                            optionValues.push(value);
                        }
                    }
                    options += '</div>';
                }
                quickviewTemplate.find('form.variants > select').after(options);
                quickviewTemplate.find('.swatch :radio').change(function() {
                    var optionIndex = jQuery(this).closest('.swatch').attr('data-option-index');
                    var optionValue = jQuery(this).val();
                    jQuery(this)
                        .closest('form')
                        .find('.single-option-selector')
                        .eq(optionIndex)
                        .val(optionValue)
                        .trigger('change');
                });
                if (product.available) {
                    Shopify.optionsMap = {};
                    Shopify.linkOptionSelectors(product);
                }

                //end of quickview variant
            } else { //single variant
                quickviewTemplate.find('form.variants > select').remove();
                var variant_field = '<input type="hidden" name="id" value="' + product.variants[0].id + '">';
                quickviewTemplate.find('form.variants').append(variant_field);
            }
        },
        createQuickViewVariants: function(product, quickviewTemplate) {
            if (product.variants.length > 1) { //multiple variants
                for (var i = 0; i < product.variants.length; i++) {
                    var variant = product.variants[i];
                    var option = '<option value="' + variant.id + '">' + variant.title + '</option>';
                    quickviewTemplate.find('form.variants > select').append(option);
                }

                new Shopify.OptionSelectors("product-select-" + product.id, {
                    product: product,
                    onVariantSelected: selectCallbackQuickview
                });
                jQuery('.quick-view .single-option-selector').selectize();
                jQuery('.quick-view .selectize-input input').attr("disabled", "disabled");

                if (product.options.length == 1) {
                    jQuery('.selector-wrapper:eq(0)').prepend('<label>' + product.options[0].name + '</label>');
                }
                quickviewTemplate.find('form.variants .selector-wrapper label').each(function(i, v) {
                    jQuery(this).html(product.options[i].name);
                });
            } else { //single variant
                quickviewTemplate.find('form.variants > select').remove();
                var variant_field = '<input type="hidden" name="id" value="' + product.variants[0].id + '">';
                quickviewTemplate.find('form.variants').append(variant_field);
            }

        },
        closeQuickViewPopup: function() {
            jQuery('.quick-view').fadeOut(500);
        },
        translateText: function(str) {
          if (!window.multi_lang || str.indexOf("|") < 0)
            return str;

          if (window.multi_lang) {
            var textArr = str.split("|");
            if (translator.isLang2())
              return textArr[1];
            return textArr[0];
          }          
        },
      translateBlock: function(blockSelector) {
          if (window.multi_lang && translator.isLang2()) {
          translator.doTranslate(blockSelector);
        }
      }
    }
//     jQuery('a').on('click touchend', function(e) {
// var el = jQuery(this);
// var link = el.attr('href');
// window.location = link;
//});
})(jQuery);
jQuery( window ).resize(function() {
      if (jQuery("#product-featured-image").length > 0) {
        var height_moreview = jQuery("#product-featured-image").height();
        jQuery('.more-view.vertical').css('height',height_moreview + 'px');
      }
})