var check1 = true;
    var check2 = true;
    var button_check = false;
    var wins = 0;

    var defender = 
        {
        name: "",
        Health_Points: 0,
        Attack_Power: 0,
        Counter_Attack_Power: 0
        };

    var my_character = 
        {
        name: "",
        Health_Points: 0,
        Attack_Power: 0,
        Counter_Attack_Power: 0
        };

    var audio_back = new Audio("assets/star-wars-theme-song.mp3");
    var audio_win = new Audio("assets/win.mp3");
    var audio_lose = new Audio("assets/lose.mp3");
    var audio_attack = new Audio("assets/attack.mp3");
 
    
        

    $(document).ready(function () {
        

        $(".characterBox").on("click", function(){

            //background music start
            audio_back.volume = 0.2;
            audio_back.play();

            //choose character
            if(check1){
                $("#choose").empty();
                $("#yourCharacter").append(this);                
                var box = $("#startArea");
                $("#enemiesArea").append(box);
                $(this).removeClass("available");

                //save my character's properties
                my_character.name = $(this).find("p.name").attr("value");
                my_character.Health_Points = $(this).find("p.score").attr("Health_Points");
                my_character.Counter_Attack_Power = $(this).find("p.score").attr("Counter_Attack_Power");
                my_character.Attack_Power = $(this).find("p.score").attr("Attack_Power");

                //can not choose my character anymore
                check1 = false;

            //choose enemy    
            } else if(check2) {
                if($(this).hasClass("available")){
                    $("#defenderArea").append(this);
                    $("#gameInfo").empty();


                    //save defender's properties
                    defender.name = $(this).find("p.name").attr("value");
                    defender.Health_Points = $(this).find("p.score").attr("Health_Points");
                    defender.Counter_Attack_Power = $(this).find("p.score").attr("Counter_Attack_Power");
                    defender.Attack_Power = $(this).find("p.score").attr("Attack_Power");

                    
                    //can not choose defender before been defeated
                    check2 = false;
                    $("#attack_button").removeClass("disabled");
                    button_check = true;
                }     
            }          
        });


        //attack button
        $("#attack_button").on("click", function(){

            if(button_check){
                audio_attack.play();


                //attack information
                var text = $("<p>");
                text.append("You attacked "+defender.name+"for "+ my_character.Attack_Power+" damage.<br>");
                text.append(defender.name+" attacked you back for "+defender.Counter_Attack_Power+".<br>");
                $("#gameInfo").html(text);


                // calculate & replace Health-points
                defender.Health_Points = defender.Health_Points - my_character.Attack_Power;
                my_character.Health_Points = my_character.Health_Points - defender.Counter_Attack_Power;
                $("#defenderArea > div").find("p.score").text(defender.Health_Points);
                $("#yourCharacter > div").find("p.score").text(my_character.Health_Points);


                //when defender loses
                if(defender.Health_Points <=0){

                    var text = $("<p>");
                    text.append("You have defeated "+defender.name+", you can choose to fight another enemy");
                    $("#attack_button").addClass("disabled");
                    $("#gameInfo").html(text);
                    $("#defenderArea").empty();

                    //can choose enemy and 
                    check2 = true;
                    button_check = false;
                    wins ++;

                    //when character wins all enemies
                    if(wins >=3){
                        audio_win.play();
                        var text = $("<p>");
                        text.append("You won!! GAME OVER !!!");
                        $("#gameInfo").html(text);
                        $("#restart_button").css("visibility", "visible");
                    }

                //when my character lose 
                } else if(my_character.Health_Points <=0){
                    audio_lose.play();

                    var text = $("<p>");
                    text.append("You been defeated... GAME OVER! ");
                    $("#gameInfo").html(text);

                    //Restart button shows and the other buttons are not availble
                    $("#restart_button").css("visibility", "visible");
                    $("#attack_button").addClass("disabled");
                    button_check = false;
                }
            }
            
        });

        //Restart button function
        $("#restart_button").on("click", function(){
            location.reload();
        });

        

    
    });