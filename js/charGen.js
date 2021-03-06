	function generate(){

		//Null optional lines
		document.getElementById("Parents2").innerHTML = "";
		document.getElementById("SiblingDesc").innerHTML = "";

		document.getElementById("TellMe").innerHTML = "Tell me another story.";

		document.getElementById("FamilyTitle").innerHTML = "Family";
		document.getElementById("ChildhoodTitle").innerHTML = "Childhood";
		document.getElementById("LifeTitle").innerHTML = "Life so far";

		document.getElementById("hr1").innerHTML = "<hr>";
		document.getElementById("hr2").innerHTML = "<hr>";

		var race = $( "#race option:selected" ).text();
		var classs = $( "#class option:selected" ).text();
		var background = $( "#background option:selected" ).text();
		var age = $( "#age option:selected" ).text();

		if(race == "Randomize (PHB)") race = RollTable(Race);
		else if(race == "Randomize (All Core)") race = RollTable(RaceAll);
		if(classs == "Randomize") classs = RollTable(Class);
		if(background == "Randomize") background = RollTable(Backgrounds);
		if(age == "Randomize") age = RollTable(Age);

		//Basics
		document.getElementById("Basic").innerHTML = race + " " + classs + ", " + background + " - " + age;

		//Parents
		var par = RollTable(Parents);
		document.getElementById("Parents").innerHTML = par;

		if(par == "You know who your parents are or were."){
			if(race == "Tiefling") document.getElementById("Parents2").innerHTML = RollTable(TieflingParents);
			else if(race == "Half-elf") document.getElementById("Parents2").innerHTML = RollTable(HalfElfParents);
			else if(race == "Half-orc") document.getElementById("Parents2").innerHTML = RollTable(HalfOrcParents);
		}

		//Birthplace 
		document.getElementById("Birthplace").innerHTML = "You were born " + RollTable(Birthplace);

		//Family
		var lifestyle = RollTable(Lifestyle);
		document.getElementById("Family").innerHTML = "You grew up " + lifestyle + " " + RollHashtags(RollTable(Family));

		//Siblings
		var siblingAmount = RollTable(Siblings);
		var siblingString = "";
		var siblingDesc = "<ol type='circle'>";

		if(siblingAmount == "None") siblingString = "You are an only child."
		else{
			siblingAmount = Roll(siblingAmount);
			if(siblingAmount == 1){
				var bo = RollTable(BirthOrder);
				if(bo == "Twin") siblingString = "You have a twin.";
				else siblingString = "You have one " + bo.toLowerCase() + " sibling.";

				siblingDesc += "<li><i>" + CreateSibling() + "</i></li>";
			
			}
			else{
				var older = 0;
				var younger = 0;
				var twin = 0;

				for (var i = 0; i < siblingAmount; i++) {
					var bo = RollTable(BirthOrder);

					if(bo == "Older") older++;
					else if (bo == "Younger") younger++;
					else twin++;
				}

				siblingString += "You have " + siblingAmount + " siblings. ";

				if(older > 0){
					if (younger > 0 || twin > 0) siblingString += older + " older. ";
					else{
						if(older > 2) siblingString += "all older than you. ";
						else siblingString += "both older than you. ";
					}
				} 
				if(younger > 0){
					if (older > 0 || twin > 0) siblingString += younger + " younger. ";
					else{
						if(younger > 2) siblingString += "all younger than you. ";
						else siblingString += "both younger than you. ";
					}
				} 
				if(twin > 0){
					if (older > 0 || younger > 0){
						if (twin > 1) siblingString += twin + " are your twins. ";
						else siblingString += twin + " is your twin. ";
					}
					else{
						if(twin > 2) siblingString += "all twins of yours. ";
						else siblingString += "both your twins. ";
					}
				} 

				for (var i = 0; i < older; i++) {
					siblingDesc += "<li><i>Older: " + CreateSibling() + "</i></li>";
				}
				for (var i = 0; i < younger; i++) {
					siblingDesc += "<li><i>Younger: " + CreateSibling() + "</i></li>";
				}
				for (var i = 0; i < twin; i++) {
					siblingDesc += "<li><i>Twin: " + CreateSibling() + "</i></li>";
				}
				siblingDesc += "</ol>";

			
			}
		}
		document.getElementById("SiblingDesc").innerHTML = RollHashtags(siblingDesc);
		document.getElementById("Siblings").innerHTML = RollHashtags(siblingString);


		//Home
		var homeMod = 0;

		switch(lifestyle) {
		    case "wretchedly": homeMod = -40; break;
		    case "in squalor": homeMod = -20; break;
		    case "poor": homeMod = -10; break;
		    case "modest": homeMod = 0; break;
		    case "comfortably": homeMod = 10; break;
		    case "wealthy": homeMod = 20; break;
		    case "aristocratically": homeMod = 40; break;
		    default: homeMod = 0;
		} 

		document.getElementById("Home").innerHTML = "You lived " + RollTable(Home, homeMod);

		//Childhood Memories
		document.getElementById("ChildhoodMemories").innerHTML = RollTable(ChildhoodMemories, parseInt($( "#charisma option:selected" ).text()));

		//Background
		var backgroundString = "You became a " + background + " because; ";
		switch(background) {
		    case "Acolyte": backgroundString += RollTable(Acolyte); break;
		    case "Charlatan": backgroundString += RollTable(Charlatan); break;
		    case "Criminal": backgroundString += RollTable(Criminal); break;
		    case "Entertainer": backgroundString += RollTable(Entertainer); break;
		    case "Folk Hero": backgroundString += RollTable(FolkHero); break;
		    case "Guild Artisan": backgroundString += RollTable(GuildArtisan); break;
		    case "Hermit": backgroundString += RollTable(Hermit); break;
		    case "Noble": backgroundString += RollTable(Noble); break;
		    case "Outlander": backgroundString += RollTable(Outlander); break;
		    case "Sage": backgroundString += RollTable(Sage); break;
		    case "Sailor": backgroundString += RollTable(Sailor); break;
		    case "Soldier": backgroundString += RollTable(Soldier); break;
		    case "Urchin": backgroundString += RollTable(Urchin); break;
		    default: backgroundString += RollTable(Acolyte);
		} 
		document.getElementById("Background").innerHTML = backgroundString;

		//Class
		var classString = "You became a " + classs + " because; ";
		switch(classs) {
		    case "Barbarian": classString += RollTable(Barbarian); break;
		    case "Bard": classString += RollTable(Bard); break;
		    case "Cleric": classString += RollTable(Cleric); break;
		    case "Druid": classString += RollTable(Druid); break;
		    case "Fighter": classString += RollTable(Fighter); break;
		    case "Monk": classString += RollTable(Monk); break;
		    case "Paladin": classString += RollTable(Paladin); break;
		    case "Ranger": classString += RollTable(Ranger); break;
		    case "Rogue": classString += RollTable(Rogue); break;
		    case "Sorcerer": classString += RollTable(Sorcerer); break;
		    case "Warlock": classString += RollTable(Warlock); break;
		    case "Wizard": classString += RollTable(Wizard); break;
		    default: classString += RollTable(Barbarian);
		} 
		document.getElementById("Class").innerHTML = classString;

		document.getElementById("Age").innerHTML = "<b>Age:</b> " + age;

		var LifeEventAmount = 0;

		switch(age) {
		    case "20 years or younger": LifeEventAmount = 1; break;
		    case "21-30 years": LifeEventAmount = Roll("1d4"); break;
		    case "31-40 years": LifeEventAmount = Roll("1d6"); break;
		    case "41-50 years": LifeEventAmount = Roll("1d8"); break;
		    case "51-60 years": LifeEventAmount = Roll("1d10"); break;
		    case "61 years or older": LifeEventAmount = Roll("1d12"); break;
		    default: LifeEventAmount = 0;
		} 

		var LifeEventString = "";

		for (var i = 0; i < LifeEventAmount; i++) {
			LifeEventString += RollHashtags(RollTable(LifeEvents)) + "<br><br>";
		}

		document.getElementById("LifeEvents").innerHTML = LifeEventString;

        if(document.getElementById("story").innerHTML.includes("undefined")){
          console.log("Something is undefined.");  
        } 

	}

	function CreateSibling(){

		var sibString = "";
		var status = "Unknown";
		var alive = "were";

		status = RollTable(Status);

        if(status != null){
            status = RollTable(Status);
        }

        if(status != null){
		    if (status.includes("Alive")) alive = "are"
        }

		sibString += "A " + RollTable(Alignment).toLowerCase() + " " + RollHashtags(RollTable(Occupation)) + ". They " + alive + " " + RollTable(Relationship).toLowerCase() + " towards you. " + status;
		return sibString;
	}

	function CreateAdventurer(){
		var advString = "";
		advString += "<i>" + RollTable(Alignment) + " " + RollTable(Race) + " " + RollTable(Class) + ", " + RollTable(Backgrounds) + " - " + RollTable(Age) + "</i>";
		return advString;
	}

	function CreateVIP(){
		var vipString = "";
		vipString += "<i>" + RollTable(Race) + " " + RollTable(Occupation) + " - " + RollTable(Age) + "</i>";
		return vipString;
	}

	function RollHashtags(str, check = 0){

        if(str == null) return "";

		str = str.replace("#Crime", RollTable(Crime));
		str = str.replace("#Punishment", RollTable(Punishment)); 
		str = str.replace("#Boon", RollTable(Boons)); 
		str = str.replace("#Tragedy", RollTable(Tragedies)); 
		str = str.replace("#ArcaneMatter", RollTable(ArcaneMatters)); 
		str = str.replace("#SupernaturalEvent", RollTable(SupernaturalEvent)); 
		str = str.replace("#WeirdStuff", RollTable(WeirdStuff)); 
		str = str.replace("#CauseOfDeath", RollTable(CauseOfDeath)); 
		str = str.replace("#War", RollTable(War)); 
		str = str.replace("#Class", RollTable(Class)); 
		str = str.replace("#class", RollTable(Class));
		str = str.replace("#Adventure", RollTable(Adventures)); 
		str = str.replace("#AbsentFather", RollTable(AbsentFather)); 
		str = str.replace("#AbsentMother", RollTable(AbsentMother)); 
		str = str.replace("#MetAdventurer", CreateAdventurer()); 
		str = str.replace("#VIP", CreateVIP());

		var a = Roll("1d2");
		if(a == 1){ 
			str = str.replace(
			"Roll 3d6. An odd number means it ended with bad feelings, while an even number means it ended amicably.", 
			"It ended with bad feelings."); 

			str = str.replace(
			"Roll 1d6. An odd number indicates you are to blame for the rift, and an even number indicates you are blameless.", 
			"You are to blame for the rift."); 
		}
		else if(a == 2){
			str = str.replace(
			"Roll 3d6. An odd number means it ended with bad feelings, while an even number means it ended amicably.", 
			"It ended amicably."); 

			str = str.replace(
			"Roll 1d6. An odd number indicates you are to blame for the rift, and an even number indicates you are blameless.", 
			"You are blameless for the rift."); 
		}
		
        if(str.includes("A current or prospective romantic partner of yours died. (Cause: Murdered).")){
            if(Roll("1d12") == 1){
                str.replace("If the result is murder, roll 1d12. On a 1, you were responsible, whether directly or indirectly.", "You were responsible, whether directly or indirectly.")
            }
            else{
                str.replace("If the result is murder, roll 1d12. On a 1, you were responsible, whether directly or indirectly.", "You weren't responsible.")
            }
        }


		//str = str.replace("2d6", Roll("2d6")); 
		//str = str.replace("1d20", Roll("1d20")); 
		//str = str.replace("1d4", Roll("1d4"));
		//str = str.replace("1d6", Roll("1d6"));

		if (str.includes("#") && check < 5) str = RollHashtags(str, check+1);

		return str;

	}

	function RollTable(object, modifier = 0){

		var roll = Roll(object["Dice"])+modifier;
		var key = GetKeyAtRoll(object,roll);
		var value = object[key];

		if(object == Alignment){
			if(value == "Chaotic evil (50%) or chaotic neutral (50%)"){
				if(Roll("1d2") == 1) value = "Chaotic evil" 
				else value = "Chaotic neutral"
			}
			else if(value == "Lawful good (50%) or lawful neutral (50%)"){
				if(Roll("1d2") == 1) value = "Lawful good" 
				else value = "Lawful neutral"
			}
			else if(value == "Chaotic good (50%) or chaotic neutral (50%)"){
				if(Roll("1d2") == 1) value = "Chaotic good" 
				else value = "Chaotic neutral"
			}
		}

		if(object == SupernaturalEvent){
			if(value.includes("to determine what type of creature possessed you")){

				var rep = ". Roll 1d6 to determine what type of creature possessed you: 1, celestial; 2, devil; 3, demon; 4, fey; 5, elemental; 6, undead.";
				var r = Roll("1d6");

				//console.log(r);
				
				switch(r){
					case 1: value = value.replace(rep, " by a celestial."); break;
					case 2: value = value.replace(rep, " by a devil."); break;
					case 3: value = value.replace(rep, " by a demon."); break;
					case 4: value = value.replace(rep, " by a fey."); break;
					case 5: value = value.replace(rep, " by a elemental."); break;
					case 6: value = value.replace(rep, " by a undead."); break;
					default: return;
				}

			}
		}

		if(value != null){
			value = value.replace("2d6", Roll("2d6")); 
			value = value.replace("1d20", Roll("1d20")); 
			value = value.replace("1d4", Roll("1d4"));
			//value = value.replace("1d6", Roll("1d6"));
		}

        if(value == null) value = RollTable(object, modifier);

		return value;
	}

	function Roll(diceString){

		if(!diceString.includes("d")){
			//console.log("Something went wrong. Tried to roll: " + diceString);
			return parseInt(diceString);
		}

		var amount = diceString.split("d")[0];
		var size = diceString.split("d")[1].split("+")[0];
		var mod = diceString.split("+")[1];

		var total = 0;

		if(mod != null) total += parseInt(mod);

		for (var i = 0; i < amount; i++) {
			total += Math.floor(Math.random() * size) + 1;
		}

		return total;
	}


	function GetKeyAtRoll(object, roll){

		var keys = Object.keys(object);

		for (var i = 0; i < keys.length; i++) {
			if (keys[i] == "Dice") continue;

			var key = keys[i];
			var delims = key.split("-");

			if(delims.length == 2){
				if(delims[0] == ""){ // "Less than" cases where list starts with "-N"
					if(roll <= delims[1]) return key;
				}
				else{ // Normal cases like "X-Y"
					if(roll >= delims[0] && roll <= delims[1]) return key;
				}
			}
			else if(delims.length == 1){
			    if(delims[0].includes("+")){
			        if (roll >= parseInt(delims[0].replace("+",""))) return key;
			    }
				else if(roll == parseInt(delims[0]))  return key; // Normal cases where element is rolled on single dice face
			}
		}

		return "Failed";
	}

