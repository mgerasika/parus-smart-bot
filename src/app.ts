import { apiHooks } from "./api/hooks/index.hook";
import { EEventType } from "./enums/event-type.enum";
import { EMessageType } from "./enums/message-type.enum";
import { IConversationStartedMessage } from "./interface/conversation-started-message.interface";
import { IMessage } from "./interface/message.interface";
import {
  sendMessage,
  sendTextMessageToViber,
} from "./utils/send-message-to-viber.util";
const { markdownToTxt } = require("markdown-to-txt");
// heroku logs -t --app parus-smart-bot
// https://parus-smart-bot.herokuapp.com/
// https://partners.viber.com/
// https://developers.viber.com/docs/api/rest-bot-api/#send-message
export async function processRequest(request: any, response: any) {
  console.log("received from viber = ", request.body);

  if (request.body.event === EEventType.message) {
    const body = request.body as IMessage;

    if (body.message.text === "2") {
      sendMessage({
        receiver: body.sender.id,
        text: "Привіт Юля. Я твій віртуальний коханець. Давай дружити 222",
        min_api_version: 7,
        type: EMessageType.text,
        keyboard: {
          Type: "keyboard",
          DefaultHeight: false,
          Buttons: [
            {
              Columns: 3,
              Rows: 1,
              ActionType: "reply",
              ActionBody: "reply1",
              Text: "Новини",
              TextSize: "regular",
            },
            {
              Columns: 3,
              Rows: 1,
              ActionType: "reply",
              ActionBody: "reply2",
              Text: "Документи",
              TextSize: "regular",
            },
            {
              Columns: 3,
              Rows: 1,
              ActionType: "reply",
              ActionBody: "reply2",
              Text: "Часті питання",
              TextSize: "regular",
            },
            {
              Columns: 3,
              Rows: 1,
              ActionType: "reply",
              ActionBody: "reply2",
              Text: "Опитування",
              TextSize: "regular",
            },
            {
              Columns: 3,
              Rows: 1,
              ActionType: "reply",
              ActionBody: "reply2",
              Text: "Показники",
              TextSize: "regular",
            },
            {
              Columns: 3,
              Rows: 1,
              ActionType: "reply",
              ActionBody: "reply2",
              Text: "Контакти",
              TextSize: "regular",
            },
            {
              Columns: 6,
              Rows: 1,
              ActionType: "reply",
              ActionBody: "reply2",
              Text: "Вихід",
              TextSize: "regular",
            },
          ],
        },
      });
      // sendMessage({
      //   sender: {
      //     name: "John McClane",
      //     avatar: "http://avatar.example.com",
      //   },
      //   tracking_data: "tracking data",
      //   type: "picture",
      //   text: "Welcome to our bot!",
      //   media: "http://www.images.com/img.jpg",
      //   thumbnail: "http://www.images.com/thumb.jpg",
      // });
    } else if (body.message.text === "1") {
      sendMessage({
        min_api_version: 2,
        type: "rich_media",
        receiver: body.sender.id,
        rich_media: {
          Type: "rich_media",
          BgColor: "#FFFFFF",
          Buttons: [
            {
              ActionBody: "https://www.google.com",
              ActionType: "open-url",
              Text: "Should get back my ID instead of replace_me_with_receiver_id",
            },
            {
              ActionBody: "https://www.google.com",
              ActionType: "open-url",
              Text: "Should get back my URL encoded ID instead of replace_me_with_url_encoded_receiver_id",
            },
            {
              ActionBody: "https://www.google.com",
              ActionType: "open-url",
              Text: "Should get back my name instead of replace_me_with_user_name",
            },
          ],
        },
      });
    } else {
      const title = markdownToTxt("Для чого створювати ОСББ?");
      const html = markdownToTxt(
        'ОСББ - це об\'єднання співмешканців багатоквартирного будинку/будинків, тобто - це самостійна юридична особа, яка може акумулювати кошти і представляти інтереси мешканців у випадку спірних ситуацій.\n\nОСББ створюється за ініціативи Ініціативної Групи (ІГ). Рішення про створення приймається за допомогою Установчих Зборів. На цих зборах співвласники обирають Правління (кілька осіб, яким делегують можливість приймати рішення). Серед правління обирається Голова ОСББ, який здійснює операційну діяльність ОСББ. Основні рішення приймають колективно Правлінням та у межах Закону України.\n\n**ОСББ "Парус Смарт" ставить перед собою завдання - мати повну фінансову прозорість та можливість приймати рішення в інтересах співвласників та мешканців.**\n\n###Чи будуть додаткові витрати на утримання ОСББ?\nОСББ є неприбутковою організацією, тому **не сплачує податки** на надходження.\n\nЗараз співвласники нерухомості у кожному з будинків ОСББ розраховуються з постачальниками послуг (вивіз сміття, обслуговування ліфтів, послуги обслуговування котельні, електропостачання, постачання та розподілу газу до котельні, тощо) через управляючу компанію ТОВ "ХОУМ СЕРВ". Управлінська компанія є комерційною організацією, що працює для отримання прибутку **та оплачує податок 5% від усіх надходжень**.\n\nМешканці можуть уникнути сплати цього податку, створивши ОСББ і заключивши прямі договори з постачальниками послуг. Також, після створення та за результатами голосування на загальних зборах, **ОСББ може перейняти функцію управителя**. Заощадженої суми грошей (податок 5% від надходжень + частина суми з утримання будинку за "послуги управителя", що закладені в тарифі "утримання будинку") буде достатньо, щоб оплачувати роботу Голові ОСББ, який буде виконувати основну операційну діяльність на об\'єкті.\n\n### Які переваги створення ОСББ?\n1. **Можливість приймати рішення** (співвласники самостійно вирішують, що робити в першу чергу)\n2. **Прозорість розрахунків** (зрозуміло що й куди платиться, ціна має обґрунтування, тарифи не змінюються без обговорення та пояснення)\n3. **Контроль надання послуг** (можна не платити за послуги, які не були надані або надані неякісно)\n4. **Можливість самостійного вибору та зміни підрядників** (вивіз сміття, обслуговування ліфтів, послуги обслуговування котельні, електропостачання, постачання та розподілу газу до котельні, тощо)\n5. **Економія на сплаті єдиного податку** (не платимо 5% за всі нарахування - вивіз сміття, обслуговування ліфтів, послуги обслуговування котельні, електропостачання, постачання та розподілу газу до котельні, тощо)\n6. **Можливість бути стороною в судових спорах** (деформаційні шви між будинками, внутрішньобудинкові мережі, питання експлуатації дахової котельні, лічильники на водопостачання, інші недоробки забудовника)\n7. **Можливість отримати додаткову парковку перед будинком** (місто може передати землю в користування тільки юридичній особі, наприклад - ОСББ. В даний момент територія належить місту)\n8. **Участь у грантових програмах та розтермінуваннях** (підземні смітники, підтримка співвласників багатоквартирних будинків, сонячні батареї, тощо)\n9. **Можливість накопичувати гроші на рахунках для резервного та ремонтного фондів**\n10. **Можливість встановити штрафні санкції за дії, які шкодять добробуту мешканців** (до прикладу - за порушення  режиму тиші, засмічення МЗК, тощо)\n\n### Чи може ОСББ найняти управляючу компанію або ФОП-управителя?\nУК / ФОП-управитель і ОСББ можуть вести спільну діяльність, якщо таке рішення було прийнято на Загальних зборах співвласників. У такому випадку основною функцією ОСББ буде - збір коштів за житлово-комунальні послуги від мешканців та співвласників, їх розподіл на оплату необхідних послуг підрядним організаціям, наведених нижче:\n\n- прибирання МЗК та прибудинкової території\n- вивіз сміття\n- обслуговування ліфтів\n- обслуговування котельні\n- обслуговування домофонів і відеонагляду\n- аварійна і ремонтна бригади\n- обслуговування димоходів\n- обслуговування системи пожежної безпеки\n- деритизація\n- послуги водопостачання та водовідведення\n- послуги постачання електроенергії\n- послуги постачання, транспортування та розподілу газу\n\n### Які закони та положення регламентують діяльність ОСББ?\n**Закони України:**\n\n["Про об\'єднання співвласників багатоквартирного будинку"](https://www.google.com/url?q=http%3A%2F%2Fzakon2.rada.gov.ua%2Flaws%2Fshow%2F2866-14&sa=D&sntz=1&usg=AFQjCNFn3bm-bV6_N7-c2dO-GSMRJSFHCw)\\\n["Про особливості здійснення права власності у багатоквартирному будинку" ](https://www.google.com/url?q=http%3A%2F%2Fzakon5.rada.gov.ua%2Flaws%2Fshow%2F417-19&sa=D&sntz=1&usg=AFQjCNFqHH02kqNGUI4wdKKQ01l2Ii8y4A)\\\n["Про житлово-комунальні послуги"](https://www.google.com/url?q=https%3A%2F%2Fzakon.rada.gov.ua%2Flaws%2Fshow%2F2189-19%23Text&sa=D&sntz=1&usg=AFQjCNFYGMsBCTvPf_XR-vifJQRua88Dsg)\\\n["Про приватизацію державного житлового фонду"](https://www.google.com/url?q=http%3A%2F%2Fzakon3.rada.gov.ua%2Flaws%2Fshow%2F2482-12&sa=D&sntz=1&usg=AFQjCNF1YgMLS7EkaJmAAEaUksGwXeCdrA)\\\n\n\n**Накази Міністерства розвитку громад і територій України:**\n\n["Про затвердження Типового статуту об\'єднання співвласників багатоквартирного будинку та Типового договору відносин власників житлових і нежитлових приміщень та управителя"](https://www.google.com/url?q=http%3A%2F%2Fzakon5.rada.gov.ua%2Flaws%2Fshow%2Fz1155-03&sa=D&sntz=1&usg=AFQjCNGpEB4jwiSANbit_lQqAzZguwuYwA)\n["Про внесення змін до Типового статуту об\'єднання співвласників багатоквартирного будинку" від 23.09.2015 № 238](https://www.google.com/url?q=http%3A%2F%2Fzakon4.rada.gov.ua%2Flaws%2Fshow%2Fz1220-15&sa=D&sntz=1&usg=AFQjCNEMWTs9DdJXk7S0S2IKC99_DVuQqw)\n["Про затвердження Положення про порядок передачі квартир (будинків), жилих приміщень у гуртожитках" від 16.12.2009 № 396](https://www.google.com/url?q=http%3A%2F%2Fzakon5.rada.gov.ua%2Flaws%2Fshow%2Fz0109-10&sa=D&sntz=1&usg=AFQjCNFZ6Bp1oHBNxK7B2GdH-WNpWRRICw)\n\nБільше інформації доступно за посиланням - [https://osbb365.com/ua/stvorennya-osbb/](https://osbb365.com/ua/stvorennya-osbb/)'
      ); // "Some quoted *code*"

      await sendMessage({
        receiver: body.sender.id,
        type: "rich_media",
        min_api_version: 7,
        rich_media: {
          Type: "rich_media",
          BgColor: "#FFFFFF",
          Buttons: [
            //   {
            //     Columns: 6,
            //     Rows: 3,
            //     ActionType: "open-url",
            //     ActionBody: "https://www.google.com",
            //     Image:
            //       "http://html-test:8080/myweb/guy/assets/imageRMsmall2.png",
            //   },
            {
              Columns: 6,
              Rows: 6,
              Text:
                `<font color=#323232><b>${title}</b></font><font color=#777777><br></font><font color=#6fc133></font>` +
                html,
              ActionType: "open-url",
              ActionBody: "https://www.google.com",
              TextSize: "medium",
              TextVAlign: "middle",
              TextHAlign: "left",
            },
            //   {
            //     Columns: 6,
            //     Rows: 1,
            //     ActionType: "reply",
            //     ActionBody: "https://www.google.com",
            //     Text: "<font color=#ffffff>Buy</font>",
            //     TextSize: "large",
            //     TextVAlign: "middle",
            //     TextHAlign: "middle",
            //     Image: "https://s14.postimg.org/4mmt4rw1t/Button.png",
            //   },
            {
              Columns: 3,
              Rows: 1,
              ActionType: "reply",
              ActionBody: "https://www.google.com",
              Text: "<font color=#8367db>MORE DETAILS</font>",
              TextSize: "small",
              TextVAlign: "middle",
              TextHAlign: "middle",
            },
            {
              Columns: 3,
              Rows: 1,
              ActionType: "reply",
              ActionBody: "https://www.google.com",
              Text: "<font color=#8367db>BACK</font>",
              TextSize: "small",
              TextVAlign: "middle",
              TextHAlign: "middle",
            },
          ],
        },
      });
    }
  }
  if (request.body.event === EEventType.conversation_started) {
    const body = request.body as IConversationStartedMessage;
    sendTextMessageToViber({
      receiver: body.user.id,
      text: "Привіт Юля. Я твій віртуальний коханець. Давай дружити 222",
      sender: {
        name: body.user.name,
        avatar: body.user.avatar,
      },
    });
  }

  response.send("ok");
}

/*
 документи та звіти
 благодійний внесок
 запитання відповіді
 контакти
 */
