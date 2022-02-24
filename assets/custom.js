jQuery.noConflict();
jQuery(function($){

  
 window.savedlast=false;
 
  
    $("#schedule_btn_in").click(function(){
        
        $("#call_back_btn button").trigger('click');

       
        $("#call_back_btn button").hide();
        $('#schedule_call_btn').modal('show');
        $('#schedule_inner').modal('hide');
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.attributeName === 'style'){
           
              
              if($('#call_back_btn .bta-product-widget').css('display')=='none'){
                
              
              
                  $('#schedule_call_btn').modal('hide');
               }
            }
        });    
      });

// Notify me of style changes
var observerConfig = {
	attributes: true, 
  attributeFilter: ["style"]
};


setTimeout(function(){ 
var targetNode = $("#call_back_btn .bta-widget-modal-back")[0];
  
observer.observe(targetNode, observerConfig);
  
  }, 500);
  
  
    });

    

    $(document).on('keyup keydown paste focusout keypress','#customFields_mvg-membership input[name=n_60701]',function (e) {
            $(this).attr('maxlength',10);
            if (/\D/g.test(this.value))
              {
                // Filter non-digits from input value.
                this.value = this.value.replace(/\D/g, '');
              }

            
        });

    $("#popup_sec .member_btn").click(function(){

    $("#mvg-membership_membership_container").find("#form_mvg-membership #mvg-membership_register_fields .bold-form-group").addClass("step1");
    $("#mvg-membership_membership_container").find("#form_mvg-membership #customFields_mvg-membership .bold-form-group").slice(0,2).addClass("step1");
    // $("#mvg-membership_membership_container").find("#form_mvg-membership #customFields_mvg-membership .bold-form-group").slice(2).addClass("step2");
    $("#mvg-membership_membership_container").find("#form_mvg-membership #mvg-membership_membership_button_stripe").hide();
//       $("#mvg-membership_membership_container").find("#form_mvg-membership #mvg-membership_membership_button_free").remove();

  });

    $("a.login_btn").click(function(){
      $(".create-an-account").hide();
      $(".login-page").show();
    });

    $("a.create_acc_btn").click(function(){
      $(".create-an-account").show();
      $(".login-page").hide();
    });


    $("#membership_popup .next_step_btn").on("click",function(){

      var er = 0;
      $("#mvg-membership_membership_container").find("#form_mvg-membership .step1").each(function(){

        var v = $(this).find("input").val();
        if(v=="")
        {
          er=1;
          $("#mvg-membership_membership_container").find("#form_mvg-membership #mvg-membership_membership_button_stripe").click();
          return  false;
        }

      });

      if(er==0){
        $("#mvg-membership_membership_container").find("#form_mvg-membership .step1").hide();
        $("#mvg-membership_membership_container").find("#form_mvg-membership .step2").show();
        $("#membership_popup .step1").hide();
        $("#membership_popup .step2").show();
      }
    });

    $("#membership_popup .pay_btn").on("click",function(){

      $("#mvg-membership_membership_container").find("#form_mvg-membership #mvg-membership_membership_button_stripe").click();

    });


    $(".health_top .health_box").click(function(){

        $(".health_top .health_box").removeClass('active');
        var step = $(this).attr("data-step");
        $(this).addClass('active');
        $(".order_top h3 span:not(.order_arrow)").text($(this).find('h4').text());
        $(".questn_list>div").hide();
        $(".questn_list ."+step).show();

    });

    $("button.close").click(function(){
        console.log("working");
        $('.modal').modal('hide');

    });

    var healthscore;
    if(window.cus_id)
    {

        $.ajax({
            
            url: 'https://app.iqyouhealth.com/api/health-questions?user_key='+window.cus_id+'&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
            type: 'GET',
            crossDomain: true,
            success:function(res){
                $(".questn_list").removeClass('loading');
                $("#schedule_popup_now").removeClass('loading');
              
              
              
              
              
                $(".my_health_step").text(res.completions_rate+'%');
              $(".health_qstns_body .my_health").html(res.intakeform);
              healthscore = parseInt(res.healthscore);
              $(".health_qstns_body .my_health input[type=radio]").each(function(){

                    var r = $(this).attr("rel");
                    var n = $(this).attr("name");
                    if(r!=undefined)
                    {
                        
                        if($(".health_qstns_body .my_health input[name='"+n+"']:checked").val()==0 || $(".health_qstns_body .my_health input[name='"+n+"']:checked").length==0)
                        {
                            console.log(r);
                            $(".health_qstns_body .my_health").find("div[rel='"+r+"']").hide();
                        }
                        

                    }

              }); 

                $('.collapsepage').each(function(){
                    id=$(this).attr('rel');
                    no = false;
                    $('#questioncontainer-'+id).find('.form-radio').each(function() {
                      rid = $(this).attr('id');
                      if ($(this).val() == 0) {
                         v = $(this).is(':checked');
                         if (v == true) {
                            no = true;
                         }
                         
                      }

                      
                   });
                    if (no == true) {
                      $('input:radio[id=toggle-'+id+']')[1].checked = true;
                      $('#questioncontainer-'+id).css('display','none');
                   }

                    $(this).on('click', function(){
                        $(this).prop('checked', true);
                        colapse = $(this).val();
                        id=$(this).attr('rel');
                        if(colapse == 0){
                            $('#questioncontainer-'+id).find('input[type=radio][value="0"]').prop('checked', true);
                        }
                        
                    });
                });

                $('.expandpage').each(function() { 
                   id=$(this).attr('rel');
                   yes = false;
                   $('#questioncontainer-'+id).find('.form-radio').each(function() {
                        rid = $(this).attr('id');
                        if ($(this).val() == 1) {
                            v = $(this).is(':checked');
                            if (v == true) {
                                yes = true;
                            }
                        }
                      
                   });
                   if (yes == true) {
                      $('input:radio[id=toggle-'+id+']')[0].checked = true;
                      $('#questioncontainer-'+id).css('display','block');
                      //$('input:radio[id=toggle-'+id+']')[0].trigger("click");
                   } 
                   
                   //else {
                      //$('input:radio[id=toggle-'+id+']')[1].checked = true;
                      //$('input:radio[id=toggle-'+id+']')[1].trigger("click");
                   //}  

                   $('#questioncontainer-'+id).find('a').each(function() {
                        var href = $(this).attr('href');
                        $(this).contents().unwrap().wrap('<span></span>');
                        //$(this).remove();
                        //$(this).text();
                        //$(this).attr('target', '_blank');
                       // $(this).attr('href', 'javascript:void(0);');
                   });

                     
                }); 

            },
           
            error:function(xhr,status,err)
            {
              console.log(err);
            }
        });


        $.get('https://app.iqyouhealth.com/api/completion?user_key='+window.cus_id+'&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7', {dataType: 'jsonp'}, function (res) {
            
            if(res.completion>=100 && !res.newuser)
            {
                api_user_data();
                api_recommend_sec();
                metabolic_risk();
            }
            else{}

        });

    }
    $(".health_qstns_body .my_health").on("change","form input[type='radio']",function(){

        var v = $(this).val();
        var r = $(this).attr("rel");
        if(r!=undefined && v==1)
        {
            $(".health_qstns_body .my_health").find("div[rel='"+r+"']").show();
        }
        else if(r!=undefined && v==0)
        {
            $(".health_qstns_body .my_health").find("div[rel='"+r+"']").hide();
        }


    });

     



    $(document).on('click', '#submitstate .form-submit,.form-submit', function (event) {
        event.preventDefault();
        var $form = $(this).closest('form');

        var id = $(this).attr("id");
        var box;
        var step = $(".health_top .health_box.active").attr("data-step");
        if(id =='edit-save')
        {
            
          box = "box"+parseInt(parseInt(step.substring(4))+1);

        }
        else if(id=='edit-previous')
        {
            box = "box"+parseInt(parseInt(step.substring(4))-1);
        }
        else
        {
            box = "box"+parseInt(step.substring(4));
            
        }
        step = "step"+parseInt(step.substring(4));

        $.ajax({
            url: 'https://app.iqyouhealth.com' + $form.prop('action').replace(/^.*\/\/[^\/]+/, ''),
            type: 'POST',
            data: $form.serialize(),
            success: function(response) {
                $(".questn_list form").find(".msg").remove();
                $(".health_top #"+box).click();
                $(".questn_list ."+step+" form").append("<p class='msg'>"+response.message+"</p>");
              
              
              
              
              
              
            },
			complete: function(response) {
              console.log('jghjgjgjjjgjghjfj');
              if( window.savedlast===true){
                
                window.savedlast=false;
                window.location.reload();
                
              }
            }
        });
    });


    $('#lap_report .lap_report_outer .update_health').text("Order Labs & DNA");
    $('#lap_report .lap_report_outer .update_health').attr("href","/collections/labs-dna");
    $('#lap_report .lap_report_outer .update_health').removeAttr( "data-toggle" );
    $('#lap_report .lap_report_outer .update_health').removeAttr( "data-target" );

    if(window.cus_id)
    {
        
        // $(".dashboard_templt").addClass('loading');
        
        $('#lap_report .lap_table').on('click', '.view-dna-reports', function (event) {
            event.preventDefault();
            if(!$(this).hasClass('viewed'))
            {
                $('#lap_report .modal-body').addClass("loading");
                $.get('https://app.iqyouhealth.com/api/dna-reports?user_key='+window.cus_id+'&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7', {dataType: 'jsonp'}, function (res) {
                    $('#lap_report').addClass('view_report');
                    $('#lap_report .lap_table').append(res.dna_reports);
                    $('#lap_report .lap_table').find('a.moreup').hide();
                    $('#lap_report .modal-body').removeClass("loading");
                    $('#lap_report .view-dna-reports').text('Hide').addClass('viewed');
                });
            }
            else
            {
                $('#lap_report #dnatable').slideToggle("fast","linear",function(){

                    if($('#lap_report #dnatable').is(":visible"))
                    {
                        $('#lap_report .view-dna-reports').text('Hide');
                    }
                    else
                    {
                        $('#lap_report .view-dna-reports').text('View');
                    }

                });

                
            }
        });

        $('#lap_report .lap_table').on('click', '.download-dna-reports', function (event) {
            event.preventDefault();
            $.get('https://app.iqyouhealth.com/api/download-dna-reports?user_key='+window.cus_id+'&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7', {dataType: 'jsonp', xhrFields: {responseType: 'blob'}}, function (res) {
                var blob = new Blob([res]);
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'DNA-Reports.pdf';
                link.click();
            });
        });

        $('#lap_report .lap_table').on('click', 'a.moredown,.moredown', function (event) {
            event.preventDefault();
            var r = $(this).attr("rel");
            $('#lap_report .lap_table').find("#more-"+r).show();
            $('#lap_report .lap_table').find("#shortsummary-"+r).hide();
        });

        $('#lap_report .lap_table').on('click', 'a.moreup,.moreup', function (event) {
            event.preventDefault();
            var r = $(this).attr("rel");
            $('#lap_report .lap_table').find("#more-"+r).hide();
            $('#lap_report .lap_table').find("#shortsummary-"+r).show();
        });

        function api_user_data()
        {
            $(".member_clickhere_sec").addClass('loading');
                $.ajax({
                    
                    url: 'https://app.iqyouhealth.com/api/user-data?user_key='+window.cus_id+'&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
                    type: 'GET',
                    crossDomain: true,
                    success:function(res){
                        var healthscore = res.healthscore;
                        var metabolicscore = res.metabolic.score;
                        var toxinsscore = res.toxins.score;

                        var health_html = '<span>Health Score</span>'+healthscore;
                        var metabolic_html = '<span>Metabolic Score</span>'+metabolicscore;
                        var toxin_html = '<span>Toxin Score</span>'+toxinsscore;

                        $(".member_clickhere_sec a[data-target='#health_score']").html(health_html);
                        $(".member_clickhere_sec a[data-target='#health_score']").addClass('score_value_dis');
                        $("#health_score .your_score_detail h2 span").text(healthscore);
                        $("#health_score .your_score_detail .complete_qtns").remove();
                        $("#health_score .your_score_detail .complete_qtns").text('See Detailed Info on IQYou');

                        $(".member_clickhere_sec a[data-target='#metabolic_score']").html(metabolic_html);
                        $(".member_clickhere_sec a[data-target='#metabolic_score']").addClass('score_value_dis');
                        $("#metabolic_score .your_score_detail h2 span").text(metabolicscore);
                        $("#metabolic_score .your_score_detail .complete_qtns").remove();
                        $("#metabolic_score .your_score_detail .complete_qtns").text('See Detailed Info on IQYou');

                        $(".member_clickhere_sec a[data-target='#toxin_score']").html(toxin_html);
                        $(".member_clickhere_sec a[data-target='#toxin_score']").addClass('score_value_dis');
                        $("#toxin_score .your_score_detail h2 span").text(toxinsscore);
                        $("#toxin_score .your_score_detail .complete_qtns").remove();
                        $("#toxin_score .your_score_detail .complete_qtns").text('See Detailed Info on IQYou');

                        if (res.dna_reports.has_report) {
                            $('#lap_report .lap_table').html('<div style="background: #eee; padding: 10px;"><span style="color: #222">DNA:</span> <strong>' +
                                res.dna_reports.name + '</strong>&nbsp;&nbsp; <a href="#" class="view-dna-reports">View</a>' +
                                '&nbsp;&nbsp; <a href="#" class="download-dna-reports">Download</a></div>'
                            );
                        } else {
                            $('#lap_report .lap_table').html('<p>You do not have any DNA or lab reports at this time</p><p> While you only need to do a DNA analysis once, we recommend doing a Wellness Panel annually.</p>');
                        }

                        $(".member_clickhere_sec").removeClass('loading');

                    },
                    error:function(xhr,status,err)
                    {
                      console.log(err);
                    }
                });

        }

    }
    else
    {
         //$("#no_iqyou_account").modal({'show':true});
    }


    $('.top_reommend_sec').on('click', '.reclink.colorbox-load', function (event) {
        event.preventDefault();
        $('#why_cont').html($(this).data('content'));
        $("#top_why_content").modal({'show':true});
    });

    if(window.cus_id)
    {
        $(".lab_results").addClass('loading');
        function api_recommend_sec(){

            $(".top_reommend_sec").addClass('loading');
            
            $.ajax({
                
                url: 'https://app.iqyouhealth.com/api/recommendations?user_key='+window.cus_id+'&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
                type: 'GET',
                crossDomain: true,
                success:function(res){
                  

                    var wrapper =$(".top_reommend_sec");
                    // console.log(res.recommendations);
                    wrapper.html(res.recommendations);
                    $.each(wrapper.find('.reclink.colorbox-load'), function (index, el) {


                        var label = $(el).closest('.recrow').find('.label');
                        label.find('a').remove();
                        label.find('div').remove();
                        $(el).prop('href', '#').data('content', label.text().trim());
                        var nextStep = $(el).closest('.recrow').find('.steps');
                        nextStep.find('.nextmenu').remove();

                        var l = "/search?type=product&q=magnesium";
                        var t = $(el).closest('.recrow').find('.rec').text().trim();
                        t = t.toLowerCase();
                        var btn_text = "Shop Now";
                        var action = "";
                        console.log(t);
                        if (t.indexOf(('Vitamin B1').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=thiamin*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Vitamin B1 (thiamine)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=thiamin*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Vitamin B2').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=vitamin*+b2*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Vitamin B2 (riboflavin)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=vitamin*+b2*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Niacinamide').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=Niacinamide";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Supplement with niacinamide (Vitamin B3)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=Niacinamide";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Pantothenic Acid').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=Pantothenic*+Acid*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take pantothenic acid').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=Pantothenic*+Acid*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Vitamin B6').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=vitamin*+b6*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Vitamin B6').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=vitamin*+b6*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Vitamin B12').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=vitamin*+b12*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Vitamin B12').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=vitamin*+b12*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Folic Acid').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=folic*+acid*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take folic acid').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=folic*+acid*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Biotin').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=biotin*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Biotin').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=biotin*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Choline').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=choline*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Choline').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=choline*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Vitamin C').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=vitamin*+c*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Vitamin C').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=vitamin*+c*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Vitamin A').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=vitamin*+a*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Vitamin A').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=vitamin*+a*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Vitamin D').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=vitamin*+d*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Vitamin D').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=vitamin*+d*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Vitamin E').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=vitamin*+e*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Vitamin E').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=vitamin*+e*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Mixed Carotenoids').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=carotenoids*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Mixed Carotenoids').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=carotenoids*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Calcium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=calcium*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Calcium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=calcium*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Copper').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=copper*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Increase your Copper intake').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=copper*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Iron').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=iron*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Iron').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=iron*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Iodine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=iodine*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Iodine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=iodine*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Manganese').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=manganese*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Manganese').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=manganese*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Magnesium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=magnesium*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Magnesium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=magnesium*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Potassium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=potassium*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Potassium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=potassium*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Phosphorus').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=phosphorus*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Increase your Phosphorus intake').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=phosphorus*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Selenium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=selenium*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Selenium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=selenium*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Zinc').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=zinc*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Zinc').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=zinc*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('S-Adenosylmethionine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=SAMe*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take S-Adenosylmethionine (SAM-e)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=SAMe*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Betaine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=betaine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Betaine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=betaine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Coenzyme Q10 (Ubiquinone)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=coq10*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take CoQ10').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=coq10*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Lipoic Acid').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=lipoic*+acid*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Lipoic acid').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=lipoic*+acid*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Omega-3 fatty acids').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=omega*+3*+fatty*+acids*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Omega-3 Fatty Acids').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=omega*+3*+fatty*+acids*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Quercetin').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=quercetin*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Quercetin').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=quercetin*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Glutamine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=glutamine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Glutamine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=glutamine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Glycine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=glycine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Glycine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=glycine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('5-HTP').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=5-htp*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take 5-HTP').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=5-htp*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Lactobacillus species').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=lactobacillus*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take the probiotic Lactobacillus').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=lactobacillus*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Flavonoids, increase intake').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=flavonoids*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Increase your Flavonoid intake').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=flavonoids*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Melatonin').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=melatonin*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Melatonin').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=melatonin*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Vitamin K').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=vitamin*+k*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Vitamin K').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=vitamin*+k*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Dehydroepiandrosterone (DHEA)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=dhea*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take DHEA').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=dhea*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('L-Carnitine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=dhea*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take L-carnitine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=dhea*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Branched-Chain Amino Acids (BCAA)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=bcaa*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Branched-Chain Amino Acids').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=bcaa*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Arginine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=arginine*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Arginine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=arginine*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Gamma-Linolenic Acid').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=gamma*+linolenic*+acid*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Gamma-Linolenic Acid (GLA)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=gamma*+linolenic*+acid*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Lycopene').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=lycopene*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Lycopene').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=lycopene*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('N-acetylcysteine (NAC)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=n-acetyl*+cysteine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take N-acetylcysteine (NAC)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=n-acetyl*+cysteine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Soy Isoflavones').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Soy*+isoflavones*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Soy Isoflavones').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Soy*+isoflavones*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Ipriflavone').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Ipriflavone*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Ipriflavone').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Ipriflavone*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Vanadyl sulfate').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Vanadium*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Vanadium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Vanadium*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Chromium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Chromium*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Chromium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Chromium*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Taurine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=taurine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Taurine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=taurine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Proanthocyanidins').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Proanthocyanidins*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Proanthocyanidins').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Proanthocyanidins*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Carnosine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=carnosine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Carnosine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=carnosine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Resveratrol').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Resveratrol*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Resveratrol').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Resveratrol*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Zinc Gluconate Lozenges').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Zinc*+Lozenges*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Zinc Gluconate lozenges').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Zinc*+Lozenges*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Betaine HCl').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=betaine*+hcl*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Betaine HCl').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=betaine*+hcl*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Strontium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Strontium*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Strontium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Strontium*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Medium chain triglycerides').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=mct*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Medium Chain Triglycerides (MCTs)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=mct*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Bile acids').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=bile*+acids*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Bile salts').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=bile*+acids*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('N-acetylglucosamine (NAG)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=NAG*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take N-acetylglucosamine (NAG)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=NAG*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Phosphatidylcholine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Phosphatidylcholine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Phosphatidylcholine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Phosphatidylcholine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Chondroitin Sulfate').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Chondroitin*+Sulfate*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Chondroitin Sulfate').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Chondroitin*+Sulfate*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Green-lipped mussel').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Green-lipped*+mussel*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Green-lipped Mussel').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Green-lipped*+mussel*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Glucosamine sulfate').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Glucosamine*+sulfate*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Glucosamine Sulfate').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Glucosamine*+sulfate*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Saccharomyces boulardii').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Saccharomyces*+boulardii*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Saccharomyces boulardii').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Saccharomyces*+boulardii*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Niacin').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=niacin*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Niacin').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=niacin*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Lipase').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Lipase*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Lipase').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Lipase*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Lutein').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Lutein*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Lutein').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Lutein*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Calcium D-glucarate').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Calcium*+D-glucarate*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Calcium D-glucarate').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Calcium*+D-glucarate*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Diindolylmethane (DIM)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=%28DIM%29*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Diindolylmethane (DIM)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=%28DIM%29*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('IP-6 (Phytate)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=IP-6*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take IP-6 (Phytate)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=IP-6*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Psyllium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Psyllium*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Psyllium').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Psyllium*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Nicotinamidadenindinucleotide (NADH)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=NADH*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take NADH').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=NADH*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Acetylcarnitine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Acetylcarnitine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Acetylcarnitine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Acetylcarnitine*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Methylsulfonylmethane (MSM)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=msm*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Methylsulfonylmethane (MSM)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=msm*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Thymus extract').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=thymus*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Thymus Extract').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=thymus*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Molybdenum').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Molybdenum*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Molybdenum').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Molybdenum*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Lactase, Oral').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=lactase*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Lactase Orally').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=lactase*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Inositol').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Inositol*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Inositol').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=Inositol*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('L-ornithine-L-aspartate').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=L-ornithine-L-aspartate*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take L-ornithine-L-aspartate').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=L-ornithine-L-aspartate*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Multivitamin/mineral Supplement').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=multivitamin*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take a Multivitamin/mineral').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=multivitamin*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Alkali minerals').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=phosphatidylserine*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Potassium Citrate').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=phosphatidylserine*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Citicoline').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=citicoline*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Citicoline').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=citicoline*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Phosphatidylserine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=phosphatidylserine*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Phosphatidylserine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=phosphatidylserine*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('L-citrulline').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=l-citruline*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take L-citrulline').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=l-citruline*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Dehydroepiandrosterone (DHEA) cream').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=dhea*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take DHEA (Dehydroepiandrosterone)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=dhea*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('5-methyltetrahydrofolate (5-MTHF)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=mthf*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('N-acetylcarnosine, topical').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=n-acetyl*+carnosine*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Apply N-acetylcarnosine topically').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=n-acetyl*+carnosine*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Ear drops, herbal combination').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=ear*+drops*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Apply herbal ear drops').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=ear*+drops*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Garlic').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=garlic*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Garlic').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=garlic*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Ginkgo').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=ginkgo*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Gingko').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=ginkgo*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Indian frankincense').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=boswellia*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Indian Frankincense (Boswellia)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=boswellia*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Feverfew').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=feverfew*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Feverfew').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=feverfew*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Peppermint oil, enteric coated').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=enteric*+coated*+peppermint*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Enteric Coated Peppermint Oil').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=enteric*+coated*+peppermint*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Saint John\'s wort').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=st*+john%27s*+wort*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Saint John\'s Wort').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=st*+john%27s*+wort*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Kava').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=kava*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Kava (Piper methysticum)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=kava*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Ginger').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=ginger*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Ginger').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=ginger*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Deglycyrrhizinated Licorice (DGL)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=dgl*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Deglycyrrhizinated Licorice (DGL)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=dgl*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Indole-3-Carbinol').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=indole*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Indole-3-Carbinol').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=indole*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Chamomile').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=chamomile*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Chamomile').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=chamomile*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Pectin, Modified Citrus (MCP)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=modified*+citrus*+pectin*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Modified Citrus Pectin (MCP)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=modified*+citrus*+pectin*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Green tea').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=green*+tea*+extract*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Green Tea Extract').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=green*+tea*+extract*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Curcumin').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=curcumin*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Curcumin').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=curcumin*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Bromelain').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=bromelain*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Bromelain').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=bromelain*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Eleuthero').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=eleuthero*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Eleutherococcus (Siberian Ginseng)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=eleuthero*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('PSK').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=turkey*+tail*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take PSK').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=turkey*+tail*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Silymarin').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=eleuthero*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Silymarin').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=eleuthero*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Ashwagandha').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=ashwagandha*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Ashwagandha').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=ashwagandha*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Korean Ginseng').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=korean*+ginseng*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Korean Ginseng').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=korean*+ginseng*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Bitter Melon').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=bitter*+melon*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Bitter Melon').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=bitter*+melon*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Gymnema').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=gymnema*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Gynmema').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=gymnema*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Butterbur').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=butterbur*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Butterbur').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=butterbur*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Rhodiola').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=rhodiola*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Fenugreek').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=fenugreek*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Fenugreek').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=fenugreek*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Cordyceps').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=cordyceps*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Cordyceps').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=cordyceps*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Chasteberry').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=chaste*+tree*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Chasteberry').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=chaste*+tree*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Cinnamon').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=cinnamon*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Cinnamon').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=cinnamon*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Bilberry').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=bilberry*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Bilberry').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=bilberry*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Black cohosh').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=black*+cohosh*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Black Cohosh').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=black*+cohosh*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Cats Claw').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=cats*+claw*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Cat\'s Claw').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=cats*+claw*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Saw palmetto').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=saw*+palmetto*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Saw Palmetto').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=saw*+palmetto*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Forskolin').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/products/coleus-forskohlii-extract?_pos=5&_sid=d7f04984e&_ss=r";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Forskolin').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/products/coleus-forskohlii-extract?_pos=5&_sid=d7f04984e&_ss=r";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Goldenseal').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=goldenseal*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Goldenseal').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=goldenseal*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Mastic gum').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=mastic*+gum*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Mastic Gum').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=mastic*+gum*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('White Willow Bark').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=willow*+bark*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take White Willow Bark').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=willow*+bark*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Echinacea').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=echinacea*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Echinacea').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=echinacea*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Hawthorn').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=hawthorn*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Hawthorn').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=hawthorn*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Berberine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=berberine*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Berberine').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=berberine*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Huperzine-A').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=huperzine*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Huperzine-A').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=huperzine*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Yohimbe').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=yohimbe*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Yohimbe').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=yohimbe*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Dong quai').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=dong*+quai*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Dong quai').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=dong*+quai*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Devil\'s Claw').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=devil%27s*+claw*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Devil\'s Claw').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=devil%27s*+claw*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Valerian').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=valerian*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Valerian').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=valerian*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Licorice').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=licorice*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Licorice').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=licorice*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Oregano').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=oregano*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Oregano').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=oregano*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Cascara').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=cascara*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Cascara').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=cascara*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Senna').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=senna*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Senna').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=senna*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Andrographis').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=andrographis*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Andrographis').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=andrographis*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Phytosterols').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=phytosterols*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Phytosterols').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=phytosterols*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Red clover').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=red*+clover*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Red Clover').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=red*+clover*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Pygeum').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=pygeum*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Pygeum').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=pygeum*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Stinging nettle').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=stinging*+nettle*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Stinging Nettle').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=stinging*+nettle*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('American Ginseng').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=american*+ginseng*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take American Ginseng').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=american*+ginseng*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Passionflower').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=passionflower*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Passionflower').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=passionflower*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('California poppy (Eschscholzia californica)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=california*+poppy*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take California Poppy').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=california*+poppy*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Lemon balm (Melissa officinalis)').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=lemon*+balm*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Lemon Balm').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?type=product&q=lemon*+balm*";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Elderberry').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=elderberry*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Take Elderberry ').toLowerCase()) != -1) {
    l = "https://myvillagegreen.com/search?q=elderberry*&type=product";
    btn_text = "Shop Now";
}
else if (t.indexOf(('Decrease your intake of foods containing Histamine').toLowerCase()) != -1) {
    action = "Identify histamine-rich foods, e.g. red wine, chocolate, aged cheese, etc., and avoid these common food triggers.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Decrease your intake of Histamines').toLowerCase()) != -1) {
    action = "Identify histamine-rich foods, e.g. red wine, chocolate, aged cheese, etc., and avoid these common food triggers.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Remove Gluten-containing foods from your diet').toLowerCase()) != -1) {
    action = "Identify all sources of gluten (wheat, barley, etc.) and remove them from your diet. This requires some close detective work.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Avoid gluten').toLowerCase()) != -1) {
    action = "Identify all sources of gluten (wheat, barley, etc.) and remove them from your diet. This requires some close detective work.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Avoid consuming foods containing Tyramine').toLowerCase()) != -1) {
    action = "Identify dietary tyramines, e.g. aged cheese, soy sauce, fermented sausage, etc., and remove these triggers from your diet.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Avoid dietary Tyramines').toLowerCase()) != -1) {
    action = "Identify dietary tyramines, e.g. aged cheese, soy sauce, fermented sausage, etc., and remove these triggers from your diet.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce the amount of Iron you consume').toLowerCase()) != -1) {
    action = "Avoiding animal foods and using an iron skillet are steps to avoid ingesting dietary forms of iron.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut down on dietary Iron').toLowerCase()) != -1) {
    action = "Avoiding animal foods and using an iron skillet are steps to avoid ingesting dietary forms of iron.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Increase the amount of protein in your diet').toLowerCase()) != -1) {
    action = "Identify healthy protein sources, e.g. nuts, seeds, beans, lentils, healthy meats, and start to increase your total intake.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Increase your protein intake').toLowerCase()) != -1) {
    action = "Identify healthy protein sources, e.g. nuts, seeds, beans, lentils, healthy meats, and start to increase your total intake.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Increase your dietary fiber').toLowerCase()) != -1) {
    action = "Identify good dietary sources of fiber, e.g. fruits/veggies, oats, whole grains, beans, etc., and eat these foods regularly.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Increase your fiber intake').toLowerCase()) != -1) {
    action = "Identify good dietary sources of fiber, e.g. fruits/veggies, oats, whole grains, beans, etc., and eat these foods regularly.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Decrease your total dietary fat').toLowerCase()) != -1) {
    action = "Reduce your intake of dietary fats (see the HOW guide) - typically around 20% is considered a reasonable goal.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut down on dietary fat').toLowerCase()) != -1) {
    action = "Reduce your intake of dietary fats - typically around 20% is considered a reasonable goal.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Decrease your intake of sugar').toLowerCase()) != -1) {
    action = "There are many sources of dietary sugar - try to eliminate most/all of them, particularly 'added' sugars.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut down on Dietary Sugar').toLowerCase()) != -1) {
    action = "There are many sources of dietary sugar - try to eliminate most/all of them, particularly 'added' sugars.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce the amount of saturated fats in your diet').toLowerCase()) != -1) {
    action = "Try to cut down on your intake of saturated fats, e.g. meats, dairy, butter, to no more than 10% of your calories.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut down on saturated fats').toLowerCase()) != -1) {
    action = "Try to cut down on your intake of saturated fats, e.g. meats, dairy, butter, to no more than 10% of your calories.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Follow a Calorie-Restricted Diet').toLowerCase()) != -1) {
    action = "A calorie restricted diet can have benefits in addition to weight loss - see the HOW section for details.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce your Calorie intake').toLowerCase()) != -1) {
    action = "A calorie restricted diet can have benefits in addition to weight loss.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Salicylates, Dietary, Decrease Intake').toLowerCase()) != -1) {
    action = "Identify and avoid foods rich in salicylates, e.g. tea, curry, berries, licorice, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce dietary Salicylate intake').toLowerCase()) != -1) {
    action = "Identify and avoid foods rich in salicylates, e.g. tea, curry, berries, licorice, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce the amount of protein in your diet').toLowerCase()) != -1) {
    action = "Consult with a nutritionist to help reduce your protein intake - this may be necessary for your kidney function.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce your Protein intake').toLowerCase()) != -1) {
    action = "Consult with a nutritionist to help reduce your protein intake - this may be necessary for your kidney function.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Decrease your fiber intake').toLowerCase()) != -1) {
    action = "Though generally helpful, you may need to cut your dietary fiber intake to 10 grams per day or less.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce your Fiber intake').toLowerCase()) != -1) {
    action = "Though generally helpful, you may need to cut your dietary fiber intake to 10 grams per day or less.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Minimize your intake of Cholesterol-containing foods').toLowerCase()) != -1) {
    action = "Reduce your intake of cholesterol, i.e. animal foods. Elimination is more effective than small reductions.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut down on dietary Cholesterol').toLowerCase()) != -1) {
    action = "Reduce your intake of cholesterol, i.e. animal foods. Elimination is more effective than small reductions.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Limit foods containing trans fatty acids').toLowerCase()) != -1) {
    action = "Aim for a goal of zero dietary trans fats, found in processed foods with \"hydrogenated\" in the ingredient list.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Avoid Trans Fatty Acids').toLowerCase()) != -1) {
    action = "Aim for a goal of zero dietary trans fats, found in processed foods with \"hydrogenated\" in the ingredient list.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Avoid Phenylethylamine containing foods').toLowerCase()) != -1) {
    action = "Identify sources of phenylethylamines (e.g. chocolate, aged cheese, etc.), and eliminate them from your diet.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Avoid dietary Phenylethylamines').toLowerCase()) != -1) {
    action = "Identify sources of phenylethylamines (e.g. chocolate, aged cheese, etc.), and eliminate them from your diet.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Decrease your sodium intake').toLowerCase()) != -1) {
    action = "Cut back on your salt intake; aim for no more than 2300mg, and as low as 1500mg per day.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut back on Dietary sodium (salt)').toLowerCase()) != -1) {
    action = "Cut back on your salt intake; aim for no more than 2300mg, and as low as 1500mg per day.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Increase your daily intake of Calories').toLowerCase()) != -1) {
    action = "Increase your total caloric intake, emphasizing foods that are also nutrient-rich, e.g. fruits/veggies, whole grains, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Increase your dietary Calorie intake').toLowerCase()) != -1) {
    action = "Increase your total caloric intake, emphasizing foods that are also nutrient-rich, e.g. fruits/veggies, whole grains, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Vitamin K, reduce intake').toLowerCase()) != -1) {
    action = "Monitor your vitamin K intake; you may be consuming too much or too inconsistent amounts given your medications.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce your Vitamin K intake').toLowerCase()) != -1) {
    action = "Monitor your vitamin K intake; you may be consuming too much or too inconsistent amounts given your medications.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Increase your potassium intake').toLowerCase()) != -1) {
    action = "Emphasize potassium rich foods, e.g. sweet potato, Swiss chard, etc.; this has both cardiovascular and urinary benefits.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Increase your dietary Potassium intake').toLowerCase()) != -1) {
    action = "Emphasize potassium rich foods, e.g. sweet potato, Swiss chard, etc.; this has both cardiovascular and urinary benefits.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Low Iodine Diet').toLowerCase()) != -1) {
    action = "Begin eating a diet with a low amount of iodine (See HOW section) - this may improve autoimmune thyroid conditions.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce your intake of Iodine').toLowerCase()) != -1) {
    action = "Begin eating a diet with a low amount of iodine - this may improve autoimmune thyroid conditions.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Decrease your alcohol consumption').toLowerCase()) != -1) {
    action = "Reduce your alcohol intake; a high intake is linked to cardiovascular and overall mortality.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut back on Alcohol consumption').toLowerCase()) != -1) {
    action = "Reduce your alcohol intake; a high intake is linked to cardiovascular and overall mortality.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Try doing Biofeedback or Meditation or Relaxation Exercise').toLowerCase()) != -1) {
    action = "Find a technique, e.g. biofeedback, meditation, etc., which helps you to reduce the effects of stress - See the HOW section.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Try Biofeedback/Meditation/Relaxation').toLowerCase()) != -1) {
    action = "Find a technique, e.g. biofeedback, meditation, etc., which helps you to reduce the effects of stress - See the HOW section.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Quit smoking').toLowerCase()) != -1) {
    action = "Few interventions have as powerful an effect as smoking cessation - see our HOW section, and find help to quit.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Quit smoking').toLowerCase()) != -1) {
    action = "Few interventions have as powerful an effect as smoking cessation - see our HOW section, and find help to quit.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Consider switching to an Non-Hormonal Contraceptive method').toLowerCase()) != -1) {
    action = "Oral contraceptives, while effective, may have adverse effects. Consider switching to a non-hormonal method, e.g. IUD, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Consider a Non-hormonal Contraceptive').toLowerCase()) != -1) {
    action = "Oral contraceptives, while effective, may have adverse effects. Consider switching to a non-hormonal method, e.g. IUD, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Exercise for 150 minutes/week at a moderate aerobic rate').toLowerCase()) != -1) {
    action = "Exercise on average 30 minutes per day, most days - this may include walking, jogging, dancing, stair climbing, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Aim for 150 minutes aerobic exercise/week').toLowerCase()) != -1) {
    action = "Exercise on average 30 minutes per day, most days - this may include walking, jogging, dancing, stair climbing, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Exercise 300 minutes/week at a moderate aerobic rate').toLowerCase()) != -1) {
    action = "Exercise on average 60 minutes per day, most days - this may include walking, jogging, dancing, stair climbing, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Aim for 300 minutes aerobic exercise/week').toLowerCase()) != -1) {
    action = "Exercise on average 60 minutes per day, most days - this may include walking, jogging, dancing, stair climbing, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Add Resistance Training to your exercise plan: moderate intensity').toLowerCase()) != -1) {
    action = "Begin resistance training - this means adding exercise designed to increase muscle mass/strength. See HOW for details.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Add in Resistance Training').toLowerCase()) != -1) {
    action = "Begin resistance training - this means adding exercise designed to increase muscle mass/strength.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Add Resistance Training to your exercise plan: light intensity').toLowerCase()) != -1) {
    action = "Start adding in light strength training to increase your muscle strength and mass. See HOW for details.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Add light Resistance Training').toLowerCase()) != -1) {
    action = "Start adding in light strength training to increase your muscle strength and mass.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Kegel exercises').toLowerCase()) != -1) {
    action = "Identify the right muscles by stopping urination midstream. Practice contracting these for longer duration, throughout the day.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Do daily Kegel Exercises').toLowerCase()) != -1) {
    action = "Identify the right muscles by stopping urination midstream. Practice contracting these for longer duration, throughout the day.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Improve your Sleep Habits').toLowerCase()) != -1) {
    action = "Review our HOW section to identify harmful sleep behaviors, e.g. caffeine, screens, etc., and start developing good habits.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Improve your Sleep Habits').toLowerCase()) != -1) {
    action = "Review our HOW section to identify harmful sleep behaviors, e.g. caffeine, screens, etc., and start developing good habits.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Include Hamstring stretches in your exercise plan').toLowerCase()) != -1) {
    action = "Stretch your hamstrings regularly (See HOW section) - this includes holding a stretch for at least 30-45 seconds.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Add Hamstring Stretches').toLowerCase()) != -1) {
    action = "Stretch your hamstrings regularly - this includes holding a stretch for at least 30-45 seconds.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Add lumbar support in the car').toLowerCase()) != -1) {
    action = "Begin using a lumbar support pad, especially while driving. These are widely available and provide relief.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Use a Lumbar Support Pad').toLowerCase()) != -1) {
    action = "Begin using a lumbar support pad, especially while driving. These are widely available and provide relief.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Use proper lifting techniques').toLowerCase()) != -1) {
    action = "Make sure when you lift anything heavy, while exercising or not, use correct techniques to avoid injury.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Begin doing Core Body strengthening exercises').toLowerCase()) != -1) {
    action = "Begin adding core strengthening exercises to protect against injury - See our HOW section for details.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Add Core Body Strengthening Exercise').toLowerCase()) != -1) {
    action = "Begin adding core strengthening exercises to protect against injury - See our HOW section for details.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Resume normal physical activity levels').toLowerCase()) != -1) {
    action = "Rather than bed rest, getting back to normal activity as soon as possible is more effective following an injury.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Get back to normal physical activity').toLowerCase()) != -1) {
    action = "Rather than bed rest, getting back to normal activity as soon as possible is more effective following an injury.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Hepatitis B Vaccine').toLowerCase()) != -1) {
    action = "The hepatitis B vaccine is strongly recommended for some populations, including health care workers, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Get vaccinated for Hepatitis B').toLowerCase()) != -1) {
    action = "The hepatitis B vaccine is strongly recommended for some populations, including health care workers, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Hepatitis A Vaccine').toLowerCase()) != -1) {
    action = "The hepatitis A vaccine is recommended for those with high risk, e.g. those in areas of high exposure.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Get vaccinated for Hepatitis A').toLowerCase()) != -1) {
    action = "The hepatitis A vaccine is recommended for those with high risk, e.g. those in areas of high exposure.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce your exposure to second hand smoke').toLowerCase()) != -1) {
    action = "More data is emerging on the dangers of second-hand smoke - it may be more hazardous than smoking, as it bypasses any filters.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Avoid Second Hand Smoke').toLowerCase()) != -1) {
    action = "More data is emerging on the dangers of second-hand smoke - it may be more hazardous than smoking, as it bypasses any filters.";
    btn_text = "Learn More";
}
else if (t.indexOf(('UVB light exposure').toLowerCase()) != -1) {
    action = "A short series (20-40 total) of UVB treatments is effective for some skin conditions.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Get exposure to UVB Light').toLowerCase()) != -1) {
    action = "A short series (20-40 total) of UVB treatments is effective for some skin conditions.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Bright light therapy').toLowerCase()) != -1) {
    action = "Start using bright light therapy - full spectrum lights appropriately timed can improve sleep & mood.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Start using Bright Light Therapy').toLowerCase()) != -1) {
    action = "Start using bright light therapy - full spectrum lights appropriately timed can improve sleep & mood.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cognitive Behavioral Therapy').toLowerCase()) != -1) {
    action = "Find a therapist trained in cognitive behavioral therapy (CBT), a proven method for a number of mental health conditions.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Find a Cognitive Behavioral Therapist').toLowerCase()) != -1) {
    action = "Find a therapist trained in cognitive behavioral therapy (CBT), a proven method for a number of mental health conditions.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Pacifier restriction').toLowerCase()) != -1) {
    action = "Avoiding or restricting pacifier use may help to reduce the risk for ear infections.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Restrict Pacifier Use').toLowerCase()) != -1) {
    action = "Avoiding or restricting pacifier use may help to reduce the risk for ear infections.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Yoga').toLowerCase()) != -1) {
    action = "Joining a regular yoga practice, including exercise for stretching, strengthening, relaxation, etc. has potent health benefits.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Add Yoga to your life').toLowerCase()) != -1) {
    action = "Joining a regular yoga practice, including exercise for stretching, strengthening, relaxation, etc. has potent health benefits.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Chewing tobacco cessation').toLowerCase()) != -1) {
    action = "Take advantage of the many resources for chewing tobacco cessation; this reduces risk for oral cancer and heart disease.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Stop using Chewing Tobacco').toLowerCase()) != -1) {
    action = "Take advantage of the many resources for chewing tobacco cessation; this reduces risk for oral cancer and heart disease.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Examine your feet regularly').toLowerCase()) != -1) {
    action = "You may be at high risk for foot infections; monitoring your feet closely can help to spot these early and receive treatment.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Examine your feet regularly').toLowerCase()) != -1) {
    action = "You may be at high risk for foot infections; monitoring your feet closely can help to spot these early and receive treatment.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Consider a Protein Redistribution diet').toLowerCase()) != -1) {
    action = "Identify histamine-rich foods, e.g. red wine, chocolate, aged cheese, etc., and avoid these common food triggers.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Consider a Protein Redistribution Diet').toLowerCase()) != -1) {
    action = "Identify histamine-rich foods, e.g. red wine, chocolate, aged cheese, etc., and avoid these common food triggers.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Follow a Low Glycemic Load/Index Diet').toLowerCase()) != -1) {
    action = "Identify all sources of gluten (wheat, barley, etc.) and remove them from your diet. This requires some close detective work.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Follow a Low Glycemic Load/Index Diet').toLowerCase()) != -1) {
    action = "Identify all sources of gluten (wheat, barley, etc.) and remove them from your diet. This requires some close detective work.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Try an Elimination and Rechallenge Diet').toLowerCase()) != -1) {
    action = "Identify dietary tyramines, e.g. aged cheese, soy sauce, fermented sausage, etc., and remove these triggers from your diet.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Try an Elimination/Rechallenge Diet').toLowerCase()) != -1) {
    action = "Identify dietary tyramines, e.g. aged cheese, soy sauce, fermented sausage, etc., and remove these triggers from your diet.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce the overall size of your meals').toLowerCase()) != -1) {
    action = "Avoiding animal foods and using an iron skillet are steps to avoid ingesting dietary forms of iron.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Lower the size of your meals').toLowerCase()) != -1) {
    action = "Avoiding animal foods and using an iron skillet are steps to avoid ingesting dietary forms of iron.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Adopt a Low Potassium Diet').toLowerCase()) != -1) {
    action = "Identify healthy protein sources, e.g. nuts, seeds, beans, lentils, healthy meats, and start to increase your total intake.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Consume a Low Potassium Diet').toLowerCase()) != -1) {
    action = "Identify healthy protein sources, e.g. nuts, seeds, beans, lentils, healthy meats, and start to increase your total intake.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Dietary Recommendations for Preconception').toLowerCase()) != -1) {
    action = "Identify good dietary sources of fiber, e.g. fruits/veggies, oats, whole grains, beans, etc., and eat these foods regularly.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Follow Preconception dietary recommendations').toLowerCase()) != -1) {
    action = "Identify good dietary sources of fiber, e.g. fruits/veggies, oats, whole grains, beans, etc., and eat these foods regularly.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Prenatal diet').toLowerCase()) != -1) {
    action = "Reduce your intake of dietary fats (see the HOW guide) - typically around 20% is considered a reasonable goal.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Follow Prenatal dietary recommendations').toLowerCase()) != -1) {
    action = "Reduce your intake of dietary fats - typically around 20% is considered a reasonable goal.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Morning sickness dietary recommendations').toLowerCase()) != -1) {
    action = "There are many sources of dietary sugar - try to eliminate most/all of them, particularly 'added' sugars.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Follow Morning sickness dietary recommendations').toLowerCase()) != -1) {
    action = "There are many sources of dietary sugar - try to eliminate most/all of them, particularly 'added' sugars.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Eat breakfast every day').toLowerCase()) != -1) {
    action = "Try to cut down on your intake of saturated fats, e.g. meats, dairy, butter, to no more than 10% of your calories.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Eat breakfast every day').toLowerCase()) != -1) {
    action = "Try to cut down on your intake of saturated fats, e.g. meats, dairy, butter, to no more than 10% of your calories.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Low carbohydrate diet').toLowerCase()) != -1) {
    action = "A calorie restricted diet can have benefits in addition to weight loss - see the HOW section for details.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Adopt a Low Carbohydrate Diet').toLowerCase()) != -1) {
    action = "A calorie restricted diet can have benefits in addition to weight loss.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Mediterranean diet').toLowerCase()) != -1) {
    action = "Identify and avoid foods rich in salicylates, e.g. tea, curry, berries, licorice, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Adopt a Mediterranean Diet').toLowerCase()) != -1) {
    action = "Identify and avoid foods rich in salicylates, e.g. tea, curry, berries, licorice, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Carbohydrate counting diet').toLowerCase()) != -1) {
    action = "Consult with a nutritionist to help reduce your protein intake - this may be necessary for your kidney function.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Start a Carbohydrate Counting Diet').toLowerCase()) != -1) {
    action = "Consult with a nutritionist to help reduce your protein intake - this may be necessary for your kidney function.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce your coffee consumption').toLowerCase()) != -1) {
    action = "While it is now generally thought to have positive effects on blood sugar, coffee, especially caffeine is not for everyone.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut back on Coffee').toLowerCase()) != -1) {
    action = "While it is now generally thought to have positive effects on blood sugar, coffee, especially caffeine is not for everyone.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Avoid cured meat products').toLowerCase()) != -1) {
    action = "Avoid nitrates and nitrites commonly used to cure meat; these compounds have been linked to allergies as well as cancer.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Avoid Cured Meats').toLowerCase()) != -1) {
    action = "Avoid nitrates and nitrites commonly used to cure meat; these compounds have been linked to allergies as well as cancer.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Eat more vegetables').toLowerCase()) != -1) {
    action = "Increase your daily consumption of veggies - ideally consume at least 5 servings of a variety (rainbow) of colors.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Eat more Vegetables').toLowerCase()) != -1) {
    action = "Increase your daily consumption of veggies - ideally consume at least 5 servings of a variety (rainbow) of colors.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Add flaxseed to your diet').toLowerCase()) != -1) {
    action = "Work up to 6T per day of flaxseed added to your meals, either whole or ground.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Add Flaxseed to your diet').toLowerCase()) != -1) {
    action = "Work up to 6T per day of flaxseed added to your meals, either whole or ground.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Substitute Olive oil (monounsaturated fats) for other fats in your diet').toLowerCase()) != -1) {
    action = "Substitute olive oil for other fats - rich in monounsaturated fats, it is a key component of the Mediterranean diet.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Use Primarily Olive Oil').toLowerCase()) != -1) {
    action = "Substitute olive oil for other fats - rich in monounsaturated fats, it is a key component of the Mediterranean diet.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Drink more water').toLowerCase()) != -1) {
    action = "Replace other beverages with clean water. Even mild dehydration has immediate effects.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Drink more Clean Water').toLowerCase()) != -1) {
    action = "Replace other beverages with clean water. Even mild dehydration has immediate effects.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Eat less improperly cooked or high-fat meat').toLowerCase()) != -1) {
    action = "Meat that has been cooked excessively (often true for high fat portions) is rich in carcinogenic HCA's. Avoid if possible.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut back on improperly cooked and high fat meat').toLowerCase()) != -1) {
    action = "Meat that has been cooked excessively (often true for high fat portions) is rich in carcinogenic HCA's. Avoid if possible.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce the amount of Chocolate you consume').toLowerCase()) != -1) {
    action = "Try cutting back on chocolate consumption; it contains compounds which trigger migraines, PMS symptoms, etc., in some people.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut back on Chocolate').toLowerCase()) != -1) {
    action = "Try cutting back on chocolate consumption; it contains compounds which trigger migraines, PMS symptoms, etc., in some people.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Decrease your consumption of Red Wine').toLowerCase()) != -1) {
    action = "Although small amounts have benefit for some, red wine contains possible triggers: sulfites, histamines, tyramines, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut back on Red Wine').toLowerCase()) != -1) {
    action = "Although small amounts have benefit for some, red wine contains possible triggers: sulfites, histamines, tyramines, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Avoid eating foods containing Aged Cheese').toLowerCase()) != -1) {
    action = "Many aged cheeses are rich in tyramines, known to be allergy symptom triggers for some individuals.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Avoid Aged Cheese').toLowerCase()) != -1) {
    action = "Many aged cheeses are rich in tyramines, known to be allergy symptom triggers for some individuals.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Drink Pomegranate juice').toLowerCase()) != -1) {
    action = "Add at least 1.5 oz Pomegranate juice per day; clinical trials have shown cardiovascular benefit.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Drink Pomegranate Juice').toLowerCase()) != -1) {
    action = "Add at least 1.5 oz Pomegranate juice per day; clinical trials have shown cardiovascular benefit.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Onions').toLowerCase()) != -1) {
    action = "Rich in quercetin, eating more onions may help to reduce the inflammation which drives many chronic conditions.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Eat More Onions').toLowerCase()) != -1) {
    action = "Rich in quercetin, eating more onions may help to reduce the inflammation which drives many chronic conditions.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Limit the animal products in your diet').toLowerCase()) != -1) {
    action = "Limit or avoid your dietary intake of animals products, e.g. meats, dairy, etc., linked to many chronic conditions.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut back on Animal Products').toLowerCase()) != -1) {
    action = "Limit or avoid your dietary intake of animals products, e.g. meats, dairy, etc., linked to many chronic conditions.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Increase the amount of fish in your diet or substitute fish for other animal proteins').toLowerCase()) != -1) {
    action = "Either replace other meats with fish, or add in wild fish to your diet; rich in cardioprotective omega-3 fats.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Increase your Fish consumption').toLowerCase()) != -1) {
    action = "Either replace other meats with fish, or add in wild fish to your diet; rich in cardioprotective omega-3 fats.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Add more Soy Protein to your diet').toLowerCase()) != -1) {
    action = "Increase your intake of soy protein (e.g. tofu, tempeh, protein shakes) - a complete protein with cardioprotective properties.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Add Soy Protein to your diet').toLowerCase()) != -1) {
    action = "Increase your intake of soy protein (e.g. tofu, tempeh, protein shakes) - a complete protein with cardioprotective properties.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Add more oats to your diet').toLowerCase()) != -1) {
    action = "Oats are rich in fiber, zinc, and magnesium. Add oatmeal to your breakfast, or see our HOW section for details.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Increase your Oat consumption').toLowerCase()) != -1) {
    action = "Oats are rich in fiber, zinc, and magnesium. Add oatmeal to your breakfast, or see our HOW section for details.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Eat more nuts').toLowerCase()) != -1) {
    action = "Eat more nuts, including cashews, almonds, and pecans, all linked to improved cardiometabolic health.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Add more Nuts to your diet').toLowerCase()) != -1) {
    action = "Eat more nuts, including cashews, almonds, and pecans, all linked to improved cardiometabolic health.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Eat more cruciferous vegetables').toLowerCase()) != -1) {
    action = "Key to good detoxification, add more cruciferous veggies to your diet, including kale, broccoli, watercress, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Eat more Cruciferous Veggies').toLowerCase()) != -1) {
    action = "Key to good detoxification, add more cruciferous veggies to your diet, including kale, broccoli, watercress, etc.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Black Tea').toLowerCase()) != -1) {
    action = "Drink black tea regularly for its cardiovascular benefit - avoid with meals if you are low in iron though.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Drink more Black Tea').toLowerCase()) != -1) {
    action = "Drink black tea regularly for its cardiovascular benefit - avoid with meals if you are low in iron though.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Eat more Fruits').toLowerCase()) != -1) {
    action = "FDA recommends 4 servings of fruit per day, choose berries high in antioxidants. See more info at http://www.fda.gov";
    btn_text = "Learn More";
}
else if (t.indexOf(('Eat more Fruit').toLowerCase()) != -1) {
    action = "FDA recommends 4 servings of fruit per day, choose berries high in antioxidants. See more info at http://www.fda.gov";
    btn_text = "Learn More";
}
else if (t.indexOf(('Decrease the amount of sucrose, and products containing sucrose, that you eat.').toLowerCase()) != -1) {
    action = "Just like lactose, not everyone can digest the sugar sucrose. See our HOW section for details.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut back on Sucrose').toLowerCase()) != -1) {
    action = "Just like lactose, not everyone can digest the sugar sucrose. See our HOW section for details.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce your dietary exposure to Tartrazine').toLowerCase()) != -1) {
    action = "Avoid foods and other products with tartrazine, aka FD&C yellow #5. Some people have severe reactions to it.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Avoid Tartrazine in your diet').toLowerCase()) != -1) {
    action = "Avoid foods and other products with tartrazine, aka FD&C yellow #5. Some people have severe reactions to it.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Heterocyclic Amines, decrease dietary intake').toLowerCase()) != -1) {
    action = "Reduce your intake of heavily cooked meats - these are known to contain heterocyclic amines, known carcinogens.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut back on dietary Heterocyclic Amines').toLowerCase()) != -1) {
    action = "Reduce your intake of heavily cooked meats - these are known to contain heterocyclic amines, known carcinogens.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Avoid foods containing sodium glutamates or MSG').toLowerCase()) != -1) {
    action = "Avoid foods with MSG, monosodium glutamate. Some people have adverse reactions, and it is often disguised in ingredients.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Avoid MSG').toLowerCase()) != -1) {
    action = "Avoid foods with MSG, monosodium glutamate. Some people have adverse reactions, and it is often disguised in ingredients.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce dietary exposure to Nitrate/Nitrites').toLowerCase()) != -1) {
    action = "Avoid foods with nitrates/nitrites, often used to cure meats. See our HOW section for details.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Cut down on Nitrates/Nitrites').toLowerCase()) != -1) {
    action = "Avoid foods with nitrates/nitrites, often used to cure meats. See our HOW section for details.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Quick acting carbohydrates').toLowerCase()) != -1) {
    action = "For short term emergencies, make sure to have quick acting carbs ready if your blood sugar falls too low.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Have Quick acting Carbs ready').toLowerCase()) != -1) {
    action = "For short term emergencies, make sure to have quick acting carbs ready if your blood sugar falls too low.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce food packaging').toLowerCase()) != -1) {
    action = "Most food packaging has bisphenol A or phthalates, both known hormone disruptors. Avoid the plastics ubiquitous in packaging.";
    btn_text = "Learn More";
}
else if (t.indexOf(('Reduce or eliminate Food Packaging').toLowerCase()) != -1) {
    action = "Most food packaging has bisphenol A or phthalates, both known hormone disruptors. Avoid the plastics ubiquitous in packaging.";
    btn_text = "Learn More";
}
else {}

                        nextStep.find('a').text(btn_text).prop('href', (action!=''?'javascript:void(0)':l)).attr('data-content','<p>'+action+'</p>').attr("data-toggle",(action!=''?'popover':''));

                        $(this).hide();


                    });

                    $(document).find('[data-toggle="popover"]').popover({placement:"auto",html: true});

                    $(".top_reommend_sec ul#reccats li[rel='nutritionalsupplementation']").click();
                    $(".top_reommend_sec #rectable .recrow.nutritionalsupplementation:gt(4)").hide();
                    wrapper.removeClass('loading');
                    $(".top_reommend_sec .recsTitle.subTitle").hide();

                    if($(".top_reommend_sec #rectable .recrow.nutritionalsupplementation").length > 5)
                    {
                        var st = "display:'none';";
                    }
                    else
                    {
                        var st = "";
                    }

                    var see_all = '<a class="recseeall" style="'+st+'">▸ See all</a>'; 
                    $(".top_reommend_sec #rectable").append(see_all);


                },
                error:function(xhr,status,err)
                {
                  console.log(err);
                }
            });

        }

        $.ajax({
            
            url: 'https://app.iqyouhealth.com/api/lab-results?user_key='+window.cus_id+'&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
            type: 'GET',
            crossDomain: true,
            success:function(res){
                $('.lab_results').html(res.content);
                $(".lab_results").removeClass('loading');
                if(res.content){
                    $('#lap_report').addClass('lab_result_content');
                }

                $('.moredown').each(function(){
                    $(this).on('click', function(){
                        $(this).parent().addClass('expanded');
                    });
                });

                $('.moreup').each(function(){
                    $(this).on('click', function(){
                        $(this).parent().removeClass('expanded');
                    });
                });

                $('.allresults').on('click', function(){
                    $('.keyfindings').removeClass('active');
                    $('.allresults').addClass('active');
                    $('.singlelabrow').addClass('active');
                });

                $('.keyfindings').on('click', function(){
                    $('.allresults').removeClass('active');
                    $('.keyfindings').addClass('active');
                    $('.singlelabrow').removeClass('active');
                });

                $('#showmorelabs').on('click', function(){
                    $(this).addClass('showmorelabs_hide');
                    $('#showfewerlabs').addClass('showfewerlabs_show');
                    $('.morelabs').addClass('active');
                });

                $('#showfewerlabs').on('click', function(){
                    $('.morelabs').removeClass('active');
                    $(this).removeClass('showfewerlabs_show');
                    $(this).addClass('showmorelabs_hide');
                    $('#showmorelabs').removeClass('showmorelabs_hide');
                    $('#showmorelabs').addClass('showmorelabs_show');
                });

                $('.labinput input[type=input]').each(function(){

                    $(this).on('click', function(){
                        id=$(this).attr('rel');
                        $('#submit-'+id).toggleClass('active');
                    });

                    $(this).on('focusout', function(){
                        id=$(this).attr('rel');
                        $('#submit-'+id).removeClass('active');
                    });
                });
                

            },
            error:function(xhr,status,err)
            {
              console.log(err);
            }
        });

        $.ajax({
            
            url: 'https://app.iqyouhealth.com/api/health-questions-family-history?user_key='+window.cus_id+'&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
            type: 'GET',
            crossDomain: true,
            success:function(res){
                $('.family_history_step').text(res.completions_rate+'%');
                $(".health_qstns_body .family_history").html(res.intakeform);

                $(".health_qstns_body .family_history form .questioncontainer a").each(function(){
                    var href = $(this).attr('href');
                    //$(this).attr('target', '_blank');
                    //$(this).attr('href', 'https://app.iqyouhealth.com'+href);
                    $(this).contents().unwrap().wrap('<span></span>');
                });
            },
            error:function(xhr,status,err)
            {
              console.log(err);
            }
        });

        $.ajax({
            
            url: 'https://app.iqyouhealth.com/api/health-questions-food-and-diet?user_key='+window.cus_id+'&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
            type: 'GET',
            crossDomain: true,
            success:function(res){
                $('.food_diet_step').text(res.completions_rate+'%');
                $(".health_qstns_body .food_diet").html(res.intakeform);
                $(".health_qstns_body .food_diet form .questioncontainer a").each(function(){
                    var href = $(this).attr('href');
                    $(this).contents().unwrap().wrap('<span></span>');
                });

                //$('.step3 #intake-wizard-intake-form').attr('action','https://app.iqyouhealth.com/system/ajax');

                /*$('.step3 #intake-wizard-intake-form').submit( function(e){
                    e.preventDefault();
                    console.log('testtttttttttttttttttttttttttt');
                    $.ajax({
                        url: 'https://app.iqyouhealth.com/system/ajax',
                        type: 'POST',
                        data: $(this).serialize(),
                        success: function(response) {
                        }
                    });
                });*/

                /*$(document).on('change','#edit-group-15',function(){
                    localStorage.setItem('selectttt','testtt');
                });*/
            },
            error:function(xhr,status,err)
            {
              console.log(err);
            }
        });

        $.ajax({
            
            url: 'https://app.iqyouhealth.com/api/health-questions-lifestyle?user_key='+window.cus_id+'&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
            type: 'GET',
            crossDomain: true,
            success:function(res){
                $('.lifestyle_step').text(res.completions_rate+'%');
                $(".health_qstns_body .lifestyle").html(res.intakeform);
                $(".health_qstns_body .lifestyle form .questioncontainer a").each(function(){
                    var href = $(this).attr('href');
                    $(this).contents().unwrap().wrap('<span></span>');
                });
            },
            error:function(xhr,status,err)
            {
              console.log(err);
            }
        });

        $.ajax({
            
            url: 'https://app.iqyouhealth.com/api/medications?user_key='+window.cus_id+'&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
            type: 'GET',
            crossDomain: true,
            success:function(res){
              $(".health_qstns_body .my_medication").html(res.intakeform);
            },
            error:function(xhr,status,err)
            {
              console.log(err);
            }
        });

        $.ajax({
            
            url: 'https://app.iqyouhealth.com/api/health-questions-smart-questions?user_key='+window.cus_id+'&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
            type: 'GET',
            crossDomain: true,
            success:function(res){
              $(".health_qstns_body .smart_questions").html(res.intakeform1);
              $(res.intakeform).insertAfter('#intake-wizard-smartquestions-form');
              
              //$('#intake-wizard-smartquestions-form').attr('action','https://app.iqyouhealth.com/profile/smart?pg=2'+$('#intake-wizard-smartquestions-form').attr('action'))
              //$(".health_qstns_body .smart_questions #intake-wizard-smartquestions-form").next().html(res.intakeform);
              $(".health_qstns_body .smart_questions form .questioncontainer a").each(function(){
                    var href = $(this).attr('href');
                    $(this).contents().unwrap().wrap('<span></span>');
                });
             
            },
          complete: function(data) {
              $("#intake-wizard-smartquestions-form #edit-save").val('Save and close questionnaire');
              console.log($("#intake-wizard-smartquestions-form #edit-save"),"88888888888888888888888888888888");
             
             
             $("#intake-wizard-smartquestions-form #edit-save").click(function() {
  
               window.savedlast=true;

});
             
             
             
           },
            error:function(xhr,status,err)
            {
              console.log(err);
            }
        });

        function metabolic_risk()
        {
            $.ajax({
                
                url: 'https://app.iqyouhealth.com/api/metabolic_risk?user_key='+window.cus_id+'&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7',
                type: 'GET',
                crossDomain: true,
                success:function(res){
                    var a,b,c;
                    $.each(res.toxins.detailed,function(i,v){

                        if(i==4)
                        {
                            c = "<h4>"+v.cause+"</h4><p>"+v.description+"</p>";
                        }
                        if(i==578)
                        {
                            a = "<h4>"+v.cause+"</h4><p>"+v.description+"</p>";
                        }
                        if(i==309)
                        {
                            b = "<h4>"+v.cause+"</h4><p>"+v.description+"</p>";
                        }
                        

                    });

                    $("#toxin_score .modal-body").append(a+b+c);
                },
                error:function(xhr,status,err)
                {
                  console.log(err);
                }
            });

        }
    }


    // $(".top_reommend_sec").on("click","a.reclink",function(e){
    //         e.preventDefault();
    //         var href = $(this).attr("href");

    //         $("#why_cont").load('https://app.iqyouhealth.com'+href+' #content > *',{dateType:'jsonp'},function(){
    //             $("#top_why_content").modal({'show':true});
    //         });

    // });

    $(".top_reommend_sec").on("click","ul#reccats li",function(){

        var c = $(this).attr("rel");
        $('.top_reommend_sec #recfilter #selectedcat').text($(this).text());
        $(".top_reommend_sec .recseeall,.top_reommend_sec .recrow").hide();

        if(c!='all' && $(".top_reommend_sec .recrow."+c).length > 5)
        {
            $(".top_reommend_sec .recseeall").show();
        }
        if(c=='all'){
            if($(".top_reommend_sec .recrow").length > 5)
            {
                $(".top_reommend_sec .recseeall").show();
            }
            $(".top_reommend_sec .recrow:lt(5)").show();
        }
        $(".top_reommend_sec .recrow."+c+":lt(5)").show();

    });

    $(".top_reommend_sec").on("click",".recseeall",function(){
        $(this).hide();
        var s = $(".top_reommend_sec #selectedcat").text().trim();
        s = s.split(' ').join('').toLowerCase();
        if(s=='all')
        {
            $(".top_reommend_sec .recrow").show();
        }
        else{
            $(".top_reommend_sec .recrow."+s).show();
        }
    });


    $(".modal").on('show.bs.modal', function(){
       //$('.modal').not(this).modal('hide');
    });
  
    $(document).on("click","#create_customer input[type=submit]",function(e){
        e.preventDefault();
        $("#create_customer").find('.error').remove()
        var fname = $("#create_customer").find("input[name='customer[first_name]']").val();
        var lname = $("#create_customer").find("input[name='customer[last_name]']").val();
        var email = $("#create_customer").find("input[name='customer[email]']").val();
        var pass = $("#create_customer").find("input[name='customer[password]']").val();
        var data = {"fname":fname,"lname":lname,"email":email,"password":pass,"iqyou_welcome_email":false};
        // console.log(data);
        $.post("https://app.iqyouhealth.com/api/sign-up?api_key=c6701296-5027-4076-b80c-d64a77c2ddc7",JSON.stringify(data),function(res){
            console.log("Response From IQYou");
            console.log(res);
            if(res.success){
                $("#create_customer").submit();
            }
          else{
            $("#create_customer").append('<p class="error">'+res.message+'</p>');
          }
        });
    });

//     $("#create_customer").submit(function(){

//       window.location = "/pages/signup";

//     });

    /*$(document).on("click","#health_qstns_modal a.question",function(e){
        e.preventDefault();
          $("#qstn_desc_modal .modal-body").html('<iframe width="100%" height="500" src="https://app.iqyouhealth.com'+$(this).attr("href")+'" frameborder="0" allowfullscreen=""></iframe>');
          $("#qstn_desc_modal").modal({show:true});

    });*/

    /*$(document).on("click","#membership_popup input[value=Login]",function(e){
            e.preventDefault();
            login().done(function (html) {  
                console.log(html);
            });

    });*/


    $(document).on("keyup keydown paste focusout","input[name='n_60705']",function(){
         $(this).val($(this).val().replace(/[^0-9]/g, ''));
         $(document).find("#n_60705-error,#n_60705-error-1").remove();
         $(this).removeClass('my-error-class');
         $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled",false);
         if(parseFloat($(this).val())>108)
         {
            /*$(this).addClass('my-error-class');
            $(this).closest('.bold-form-group').append('<label id="n_60705-error" class="my-error-class" for="n_60705" style="display: block;">Height not greater than 108 inch.</label>');
            $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled",true);
            $(this).closest('form').append('<label id="n_60705-error-1" class="my-error-class" style="display:inherit;">Height not greater than 108 inch.</label>')*/
         }
    });

    $(document).on("keyup keydown paste focusout","input[name='n_60704']",function(){
         $(this).val($(this).val().replace(/[^0-9]/g, ''));
         $(document).find("#n_60704-error,#n_60704-error-1").remove();
         $(this).removeClass('my-error-class');
         $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled",false);
         if(parseFloat($(this).val())>108)
         {
            $(this).addClass('my-error-class');
            $(this).closest('.bold-form-group').append('<label id="n_60704-error" class="my-error-class" for="n_60704" style="display: block;">Height not greater than 108 inch.</label>');
            $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled",true);
            $(this).closest('form').append('<label id="n_60704-error-1" class="my-error-class" style="display:inherit;">Height not greater than 108 inch.</label>')
         }
    });

    $(document).on("keyup keydown paste focusout","input[name='n_60703']",function(){
         $(this).val($(this).val().replace(/[^0-9]/g, ''));
         $(document).find("#n_60703-error,#n_60703-error-1").remove();
         $(this).removeClass('my-error-class');
         $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled",false);
         if(parseFloat($(this).val())>108)
         {
            $(this).addClass('my-error-class');
            $(this).closest('.bold-form-group').append('<label id="n_60703-error" class="my-error-class" for="n_60703" style="display: block;">Age not greater than 120.</label>');
            $(this).closest('form').find("input[type=button],input[type=submit]").prop("disabled",true);
            $(this).closest('form').append('<label id="n_60703-error-1" class="my-error-class" style="display:inherit;">Age not greater than 120.</label>');
         }
    });

    var url = $(location).attr('href'),
    parts = url.split("/"),
    last_part = parts[parts.length-1];
    if(last_part == 'membership-dashboard'){
        Accentuate($("#metafields_form"), function(data) { $("#metafields_form").find("p.success").remove();if(data.status=='OK'){$("#metafields_form").append('<p class="success">'+data.message+'</p>')} });
    }

    $(document).on('keyup', '#edit-drugsearch', function(){
       
        if($(this).val().length >= 4){
   
        $.ajax({
        
            url: 'https://app.iqyouhealth.com/api/medications?user_key='+window.customer_id+'&api_key=c6701296-5027-4076-b80c-d64a77c2ddc7&drugsearch='+$(this).val(),
            type: 'GET',
            crossDomain: true,
            success:function(res){
                var ht = '';
                ht += '<div id="autocomplete"><ul class="autoListing">'
                $.each(res.matches,function(i,v){
                    var pos = i.indexOf("(") + 1;
                    var remain = i.slice(pos, -1);
                    var rem_string = remain.split('-', 1)[0]
                    ht += '<li data-value='+rem_string+'>'+v+'</li>';
                });
                ht += '</ul></div>';
                $('.form-item-drugsearch').find('label').html(ht);

                $(document).on('click','#autocomplete .autoListing li', function(){
                    $('#autocomplete').css('display','none');
                    $('#edit-drugsearch').val($(this).text());
                    var li = $(this).attr('data-value');
                    //$('#questioncontainer-1 .questionrow').css('display','none');
                    $('#questioncontainer-1 .questionrow').each(function(){
                        if($(this).attr('id') == 'table-'+li){
                            $(this).css('display','block');
                        }
                    });
                });
            },
            error:function(xhr,status,err)
            {
              console.log(err);
            }
        });
    }
    });



});

function turnup(r)
{
    console.log(r);
    $('#lap_report .lap_table').find("#more-"+r).hide();
    $('#lap_report .lap_table').find("#shortsummary-"+r).show();
}

var loadFile = function(event) {
    var output = document.getElementById('profile_image');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  };

function login() {  
  var data = $("#customer_login").serialize();
  var promise = $.ajax({
    url: '/account/login',
    method: 'post',
    data: data,
    dataType: 'html',
    async: true
  });

  return promise;
}