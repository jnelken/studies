# == Schema Information
#
# Table name: taggings
#
#  id               :integer          not null, primary key
#  tag_topic_id     :integer
#  shortened_url_id :integer
#  created_at       :datetime
#  updated_at       :datetime
#

class Tagging < ActiveRecord::Base
  validates :tag_topic_id, presence: true
  validates :shortened_url_id, presence: true

  belongs_to(
    :tag_topic,
    class_name: "TagTopic",
    foreign_key: :tag_topic_id,
    primary_key: :id
  )

  belongs_to(
    :shortened_url,
    class_name: "ShortenedUrl",
    foreign_key: :shortened_url_id,
    primary_key: :id
  )

  def self.tag_url!(tag_topic, shortened_url)
    Tagging.create!(
      tag_topic_id: tag_topic.id, shortened_url_id: shortened_url.id
    )
  end
end
