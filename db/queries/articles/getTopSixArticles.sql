select articlestable.*, votestable.votes from (select sum(vote_type) votes, topic_id from votes where type='article' group by topic_id) votestable left join (select * from articles) articlestable on (articlestable.id = votestable.topic_id) order by votestable.votes desc limit 6;