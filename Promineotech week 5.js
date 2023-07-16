//: this first step of code creates the class Basketball game
//: and the constructor initializes the team options, and home team
//: away team, teams are set to null because they are user chosen

class BasketballGame {
    constructor() {
      this.teamOptions = ['Denver Nuggets', 'Chicago Bulls', 'Miami Heat', 'L.A. Lakers'];
      this.homeTeam = null;
      this.awayTeam = null;
    }
  
//: this creates the game by implementing select team.
    createGame() {
      this.selectHomeTeam();
      this.selectAwayTeam();
      this.display();
    }
  
//: this allow user to chose what team they want to use.
    selectHomeTeam() {
      const homeTeamIndex = parseInt(prompt(`Choose your home team:\n\n${this.getTeamOptionsString()}`));
      if (isNaN(homeTeamIndex) || homeTeamIndex < 1 || homeTeamIndex > this.teamOptions.length) {
        alert('Invalid home team selection.');
        this.selectHomeTeam();
      } else {
        this.homeTeam = this.teamOptions[homeTeamIndex - 1];
      }
    }
  //: this allow user to chose what team they want to use.
    selectAwayTeam() {
      const awayTeamIndex = parseInt(prompt(`Choose the away team:\n\n${this.getTeamOptionsString()}`));
      if (isNaN(awayTeamIndex) || awayTeamIndex < 1 || awayTeamIndex > this.teamOptions.length) {
        alert('Invalid away team selection.');
        this.selectAwayTeam();
      } else {
        this.awayTeam = this.teamOptions[awayTeamIndex - 1];
      }
    }
  
    display() {
      return `Game: ${this.homeTeam} vs. ${this.awayTeam}`;
    }
  //: method gets a string of team options, from the array
  //: created earlier in the code. It causes it to be a string, 
  //: that is joined with a new line and indexed with a value 
  //: for choosing.
    getTeamOptionsString() {
      return this.teamOptions.map((team, index) => `${index + 1}. ${team}`).join('\n');
    }
  }
  //: this manages the game menu by creating a class for it
  class GameMenu {
    constructor() {
      this.games = [];
      this.teamOptions = ['Denver Nuggets', 'Chicago Bulls', 'Miami Heat', 'L.A. Lakers'];
    }
  //: this creates a new game instance, and adds it to the list of games
    createGame() {
      const newGame = new BasketballGame();
      newGame.createGame();
      this.games.push(newGame);
    }
  //: this generates a list of all the games played
    viewGames() {
      let gamesOutput = 'Games:\n';
      this.games.forEach(game => {
        gamesOutput += game.display() + '\n';
      });
      return gamesOutput;
    }
  //: this enables you to delete the game, it just closes the game out
  //: for now, but you have to chose the right game by chosing the 
  //: the team match ups and deleting that game, if you chose a team
  //: match up that was not played it will return a prompt saying 
  //: that game could not be found
    deleteGame(homeTeam, awayTeam) {
      const index = this.games.findIndex(game =>
        game.homeTeam === homeTeam && game.awayTeam === awayTeam
      );
      if (index > -1) {
        this.games.splice(index, 1);
        return 'Game has been deleted.';
      } else {
        return 'That game could not be found.';
      }
    }
  //: allow the user to view the teams available 
    viewTeams() {
      return `Available teams:\n${this.teamOptions.join('\n')}`;
    }
  //: allows the user to chose there home team
    chooseHomeTeam() {
      let homeTeamOutput = 'Select home team:\n';
      this.teamOptions.forEach((team, index) => {
        homeTeamOutput += `${index + 1}. ${team}\n`;
      });
      const homeTeamIndex = parseInt(prompt(homeTeamOutput + 'Enter the index of the home team:'));
      if (isNaN(homeTeamIndex) || homeTeamIndex < 1 || homeTeamIndex > this.teamOptions.length) {
        alert('Invalid home team selection.');
        return this.chooseHomeTeam();
      } else {
        return this.teamOptions[homeTeamIndex - 1];
      }
    }
  //:allows the user to choose the away team.
    chooseAwayTeam() {
      let awayTeamOutput = 'Select away team:\n';
      this.teamOptions.forEach((team, index) => {
        awayTeamOutput += `${index + 1}. ${team}\n`;
      });
      const awayTeamIndex = parseInt(prompt(awayTeamOutput + 'Enter the index of the away team:'));
      if (isNaN(awayTeamIndex) || awayTeamIndex < 1 || awayTeamIndex > this.teamOptions.length) {
        alert('Invalid away team selection.');
        return this.chooseAwayTeam();
      } else {
        return this.teamOptions[awayTeamIndex - 1];
      }
    }
  //: this allows the user to exit the game, causes an alert exiting.
    exit() {
      alert('Exiting...');
    }
  }
  //: the game menu that the user sees and is prompted to choose from.
  //: it is a new instance of GameMenu class.
  const gameMenu = new GameMenu();
  //: this function enables to see and choose what they want to do.
  function showMenuOptions() {
    return prompt(`Menu Options:
      0. Exit Game
      1. Create Game
      2. View Teams
      3. Choose Home Team
      4. Choose Away Team
      5. Delete Game
      
    `);
  }
  //: this start function basically gets the menu going, working with 
  //: the options provided above, it will iterate through until exit
  //: or deleted.
  function start() {
    let userSelection = showMenuOptions();
  
    while (userSelection !== '0') {
      switch (userSelection) {
        case '1':
          gameMenu.createGame();
          alert('Your game has been created!');
          break;
        case '2':
          alert(gameMenu.viewTeams());
          break;
        case '3':
          const homeTeam = gameMenu.chooseHomeTeam();
          alert(`Home team selected: ${homeTeam}`);
          break;
        case '4':
          const awayTeam = gameMenu.chooseAwayTeam();
          alert(`Away team selected: ${awayTeam}`);
          break;
        case '5':
          const deleteHomeTeam = gameMenu.chooseHomeTeam();
          const deleteAwayTeam = gameMenu.chooseAwayTeam();
          alert(gameMenu.deleteGame(deleteHomeTeam, deleteAwayTeam));
          break;
        default:
          alert('Invalid choice.');
          break;
      }
  //: Where the user selections are stored.
      userSelection = showMenuOptions();
    }
  
    gameMenu.exit();
  }
  //: this is the starting point of the program, it initlaizes it.
  start();
