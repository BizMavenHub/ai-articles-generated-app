export default class ArticleObject {
  // This class represents an article object with various properties.
  constructor(
    topic,
    tone,
    article_type,
    keywords,
    target_audience,
    article_length,
    key_points,
    primary_goal,
    avoidable_instructions,
    additional_instructions,
    call_to_action,
    article_focused_on,
    inspiration,
    content
  ) {
    this.topic = topic;
    this.tone = tone;
    this.article_type = article_type;
    this.keywords = keywords;
    this.target_audience = target_audience;
    this.article_length = article_length;
    this.key_points = key_points;
    this.primary_goal = primary_goal;
    this.avoidable_instructions = avoidable_instructions;
    this.additional_instructions = additional_instructions;
    this.call_to_action = call_to_action;
    this.article_focused_on = article_focused_on;
    this.inspiration = inspiration;
    this.content = content;
  }

  // This method converts the article object to a string representation.
  toString() {
    return `Topic: ${this.topic}
    \nArticle Type: ${this.article_type}
    \nTone: ${this.tone}
    \nKeyword: ${this.keywords}
    \nTarget Audience: ${this.target_audience}
    \nArticle Length: ${this.article_length}
    \nKey Points: ${this.key_points}
    \nPrimary Goal: ${this.primary_goal}
    \nAvoiding Instructions: ${this.avoidable_instructions}
    \nAdditional Instructions: ${this.additional_instructions}
    \nContent: ${this.content} \nCall to Action: ${this.call_to_action}
    \nArticle Focused On: ${this.article_focused_on}
    \nInspiration: ${this.inspiration}`;
  }
}
