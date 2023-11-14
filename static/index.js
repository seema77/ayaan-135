var date=new Date()
let display_date="Date:" + date.toLocaleDateString() // dd/mm/yyyy

$(document).ready(function(){
    $("#display_date").html(display_date)
    $("#save_button").prop('disabled',true)
})

let prediction_emotion;

$(function(){
    $("#predict_button").click(function(){
        let input_data={
            "text":$("#text").val()
        }
        $.ajax({
            type:'POST',
            url:"/predict-emotion",
            data:JSON.stringify(input_data),
            dataType:"json",
            contentType:'application/json',
            success:function(result){
                $("#prediction").html(result.data.predicted_emotion)
                $("#emo_img_url").attr('src',result.data.predicted_emotion_img_url)
                $("#prediction").css("display","")
                $("#emo_img_url").css("display","")
                predicted_emotion=result.data.predicted_emotion
                $("#save_button").prop("disabled",false)
            },
            error:function(result){
                alert(result.responseJSON.message)
            }
        })
    })
    $("#save_button").click(function(){
        save_data={
            "date":display_date,
            "text":$("#text").val(),
            "emotion":predicted_emotion

        }
        $.ajax({
            type:"POST",
            url:"/save-entry",
            data:JSON.stringify(save_data),
            dataType:"json",
            contentType:"application/json",
            success:function(){
                alert:("Your entry has been successfully saved !!")
                window.location.reload()
            },
            error:function(result){
                alert(result.responseJSON.message)
            }

        })
    })
  
})