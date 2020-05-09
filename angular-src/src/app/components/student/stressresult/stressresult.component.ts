import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-stressresult',
  templateUrl: './stressresult.component.html',
  styleUrls: ['./stressresult.component.css']
})
export class StressResultComponent implements OnInit {
  score: number;
  data2: any;
  data: any;
  heading: any;
  isValid = false;
  image: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
  ) { }
  ngOnInit() {
    if (localStorage.getItem('score')) {
      this.isValid = true;
      this.score = JSON.parse(localStorage.getItem('score'));

      if (this.score[0] == 'E' && this.score[1] == ' S' && this.score[2] == ' T' && this.score[3] == ' J') {
        this.heading = 'The Supervisor';
        this.data = 'You are Practical and consistent and like to have order everywhere by planning and organizing everything. But most of all you like to convince people of your rightness and make them think the way you think. You look at life soberly and above all, trust facts. You are open for communication, meeting new people and spending time at parties. You never forget to take care of your loved ones and can express your love really well. '
        this.image = 'https://storage.googleapis.com/neris/public/images/types/istj.png'
      }

      if (this.score[0] == 'E' && this.score[1] == ' S' && this.score[2] == ' F' && this.score[3] == ' J') {
        this.heading = 'The Provider';
        this.data = 'You get along with people very well, and you are the life of any party. you are attentive, caring, and always ready to help, even if you hvae to sacrifice your interests for others. Yet you are very independent in your deals and, as a rule, you get everything without any side help. You only wait for emotional support from your close ones. '
        this.image = 'https://storage.googleapis.com/neris/public/images/types/esfj.png'
      }
      if (this.score[0] == 'E' && this.score[1] == ' N' && this.score[2] == ' F' && this.score[3] == ' J') {
        this.heading = 'The Giver';
        this.data = "You are emptional and talkative with rich facial expressions and gesticulations. You are very empathetic to other people's emotions, and you can spot even the tiniest insincerity. You are very jealous and distrustful in lov relationships. Very often, you are ready to face upcoming events because of your ability to feel them in advance. You take friendships very seriously and always put an effort to stay connected. You take the same approach to your life too."
        this.image = 'https://storage.googleapis.com/neris/public/images/types/enfj.png'
      }
      if (this.score[0] == 'E' && this.score[1] == ' N' && this.score[2] == ' T' && this.score[3] == ' J') {
        this.heading = 'The Commander';
        this.data = "Life for you is struggle and extreme. This is how you know yourself and others. Being risky and brave, you are easily inspired to start something new. At the same time, you assess your abilities, both strengths, and waekness, quite adequately. You feel new tendencies very well and are open to new ideas. You think positively and adore sport and everything connected to it."
        this.image = 'https://storage.googleapis.com/neris/public/images/types/entj.png'
      }
      if (this.score[0] == 'E' && this.score[1] == ' S' && this.score[2] == ' T' && this.score[3] == ' P') {
        this.heading = 'The Doer';
        this.data = "You strive to reach your goals by any means, even if you have to use physical strength. You stick to an exact plan, and you can't stand dependence and compromises. You are a born fighter,very active and self-organized. You can objectively evaluate even the most stressful situtation and give a quick and eact response."
        this.image = 'https://storage.googleapis.com/neris/public/images/types/estp.png'
      }
      if (this.score[0] == 'E' && this.score[1] == ' S' && this.score[2] == ' F' && this.score[3] == ' P') {
        this.heading = 'The Performer';
        this.data = "You can professionaly determine the opportunities for your surroundings, and very often you use this skill to manipulate people, you primarily follow your interests. However, you try to impress everybody and create the image of a simple person. You stand firmly in the present moment, and you don't like to waste time You want quick results, disliking bureaucracy and red tape "
        this.image = 'https://storage.googleapis.com/neris/public/images/types/esfp.png'
      }
      if (this.score[0] == 'E' && this.score[1] == ' N' && this.score[2] == ' F' && this.score[3] == ' P') {
        this.heading = 'The Champion';
        this.data = "You are energetic and inquisitive, with creative skills. You combine the features of both introverts and extroverts, which is why not only do you get along with people but you also empthaize as well. You are very good at advising. You preceive life with all the diversitry of its possibilities. You have a rich imagination and a very high IQ. You are a very harmonious person, able to keep the balance even in very quickly chnaging environment"
        this.image = 'https://storage.googleapis.com/neris/public/images/types/enfp.png'
      }
      if (this.score[0] == 'E' && this.score[1] == ' N' && this.score[2] == ' T' && this.score[3] == ' P') {
        this.heading = 'The Inventor';
        this.data = "You are the generator of ideas. You are always seeking to create something new. You adapt to non familiar environments fast and master different methods of work easily. Due to your dislike of traditions and routine, you very often chnage your professional spheres and hobbies, becoming an innovator and a pioneer. What is important about you is that not only you can create new ideas but you are also able to convey them to others and make them come true."
        this.image = 'https://storage.googleapis.com/neris/public/images/types/entp.png'
      }
      if (this.score[0] == 'I' && this.score[1] == ' S' && this.score[2] == ' T' && this.score[3] == ' J') {
        this.heading = 'The Inspector';
        this.data = "Thoughtful, pensive, responsible. You are trustworthy, but you never take things as they are, always analyzing the incoming information. You are not interested in long-term communication and prefer official communication only during companionship. You are aimed at the final result. You like strictness and order, and very often you are pedantic. You don't live in your dreams, only in the 'here and now.'"
        this.image = 'https://storage.googleapis.com/neris/public/images/types/istj.png'
      }
      if (this.score[0] == 'I' && this.score[1] == ' S' && this.score[2] == ' F' && this.score[3] == ' J') {
        this.heading = 'The Protector';
        this.data = "You can't stand falseness and insincerity in relationships. You distinguish 'strangers' and keep them at a distance right away. For the people 'inside your circle,' you do anything and never ask for anything in return. You are observant and very careful with words and deeds. Kind and caring, you see your main goal as helping people and making them happier. You certainly put your whole heart in your family and want your relationships to last a lifetime."
        this.image = 'https://storage.googleapis.com/neris/public/images/types/isfj.png'
      }
      if (this.score[0] == 'I' && this.score[1] == ' N' && this.score[2] == ' F' && this.score[3] == ' J') {
        this.heading = 'The Counselor';
        this.data = "You are good at sensing people and their relationships. You can easily identify moods and hidden talents, which is why people seek advice from you. However, you are very vulnerable and can't stand aggression and lack of love. Your driving force is intuition, aimed not outside but inside. This type of person never stops learning, considering self-development to be the main priority. By getting to know yourself, you help others."
        this.image = 'https://storage.googleapis.com/neris/public/images/types/infj.png'
      }
      if (this.score[0] == 'I' && this.score[1] == ' N' && this.score[2] == ' T' && this.score[3] == ' J') {
        this.heading = 'The Mastermind';
        this.data = "You have the richest inner world from where you get incredible ideas. You strive for excellence and want to improve everything and everybody. However, you have some difficulties in relationships with people, very often distancing yourself intentionally to demonstrate your independence. You can set priorities and trust your intuition. In relationships, you very often make a mistake of distancing yourself intentionally to demonstrate your independence."
        this.image = 'https://storage.googleapis.com/neris/public/images/types/intj.png'
      }
      if (this.score[0] == 'I' && this.score[1] == ' S' && this.score[2] == ' T' && this.score[3] == ' P') {
        this.heading = 'The Craftsman';
        this.data = "You have a technical mindset and like to make things by hand. You don't hurry with taking decisions and think that it is better twice measured than once wrong. However, you always meet deadlines, and you are very punctual by nature. You perceive this world through feelings, and your opinion of things happening around you is very objective and specific. By nature, you are communicative, but you will refuse communication once you feel insincerity."
        this.image = 'https://storage.googleapis.com/neris/public/images/types/istp.png'
      }
      if (this.score[0] == 'I' && this.score[1] == ' S' && this.score[2] == ' F' && this.score[3] == ' P') {
        this.heading = 'The Composer';
        this.data = "You can find joy in simple things, handling routine and monotony easily. You like to feel needed, which is why you always help other people but never interfere with their comfort zone. You can't stand conflicts, and you can always entertain people and make them laugh. You're a very down-to-earth, practical, caring, tender, reliable, and faithful partner. You take this world as it is, never trying to lead and manipulate."
        this.image = 'https://storage.googleapis.com/neris/public/images/types/isfp.png'
      }
      if (this.score[0] == 'I' && this.score[1] == ' N' && this.score[2] == ' F' && this.score[3] == ' P') {
        this.heading = 'The Idealist';
        this.data = "A lyricist and dreamer, your inner harmony and self-agreement are always in first place. Most of your thinking happens deep inside of you. Nevertheless, you can foresee events and understand people well. You like to dress up and try to look good in all circumstances. You can't be called thrifty, and you often lose the sense of time and reality."
        this.image = 'https://storage.googleapis.com/neris/public/images/types/infp.png'
      }
      if (this.score[0] == 'I' && this.score[1] == ' N' && this.score[2] == ' T' && this.score[3] == ' P') {
        this.heading = 'The Thinker';
        this.data = "An egghead and philosopher, you don't like too much expressiveness. You always seek calm emotions and comfort. You're very careful when making decisions, preferring to analyze and find connections between the past, present and future. You are very sensitive to changes, and you don't handle them easily. You always try to collect all of your facts, thoughts, and ideas, and that's why you are very often tense."
        this.image = 'https://storage.googleapis.com/neris/public/images/types/intp.png'
      }
      // this.score= localStorage.getItem('score');
      // this.data = localStorage.getItem('length');
      // this.result = ((this.score/this.data)*100).toFixed(2);

    }

    this.score = JSON.parse(localStorage.getItem('stressscore'));
    if (this.score >= 10 && this.score <= 16) {
      this.data2 = "You dont seem to be suffering from stress and overall you are balanced and happy";
    }
    if (this.score >= 17 && this.score <= 24) {
      this.data2 = "You are a serious worrier and fear that a panic attack could strike at any time. This holds you back from living your life to the fullest.  "
    }
    if (this.score >= 25 && this.score <= 32) {
      this.data2 = "You prefer to be on your own and you struggle to develop relationships with others. You lack empathy and dont exhibit emotions. "
    }
    if (this.score >= 33 && this.score <= 40) {
      this.data2 = "You are burdened by feelings of hopelessness and helplessness and you are not truly engaged in life. You deserve to be happy, healthy and talking to a doctor may help. "
    }
  }
  onlogout() {
    this.authService.onLogout();
    this.flashMessage.show('You have logged out successfully', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/']);
    return false;
  }
  onLogoutClick() {
    this.authService.onLogout();
    this.flashMessage.show('You have logged out successfully', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/']);
    return false;
  }
  consult() {
    this.router.navigate(['useranalysis'])
  }
}