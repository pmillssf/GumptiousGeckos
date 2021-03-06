select articlestable.*, votestable.votes 
from 
  (select * from articles) articlestable 
left join 
  (select 
    sum(vote_type) votes, topic_id 
  from votes 
  where type='article' 
  group by topic_id) votestable 
on (articlestable.id = votestable.topic_id) 
order by articlestable.published_at desc NULLS LAST limit 25;
