# == Schema Information
#
# Table name: shortened_urls
#
#  id           :integer          not null, primary key
#  long_url     :string(255)
#  short_url    :string(255)
#  submitter_id :integer
#  created_at   :datetime
#  updated_at   :datetime
#
require 'securerandom'

class ShortenedUrl < ActiveRecord::Base
  validates :submitter_id, presence: true,
  #validate :only_five_per_min
  validates :short_url, presence: true, uniqueness: true
  validates :long_url, presence: true, length: { maximum: 255 }

  belongs_to(
    :submitter,
    class_name: "User",
    foreign_key: :submitter_id,
    primary_key: :id
  )

  has_many(
    :visits,
    class_name: "Visit",
    foreign_key: :short_url_id,
    primary_key: :id
  )

  has_many(
    :visitors,
    through: :visits,
    source: :visitor
  )

  has_many(
    :distinct_visitors,
    -> { distinct },
    through: :visits,
    source: :visitor
  )

  has_many(
    :taggings,
    class_name: "Tagging",
    foreign_key: :shortened_url_id,
    primary_key: :id
  )

  has_many(
    :tag_topics,
    through: :taggings,
    source: :tag_topic
  )

  def self.random_code
    random_code = SecureRandom.urlsafe_base64(16)
    while ShortenedUrl.exists?(random_code)
      random_code = SecureRandom.urlsafe_base64(16)
    end

    random_code
  end

  def self.create_for_user_and_long_url!(user, long_url)
    ShortenedUrl.create!(
      submitter_id: user.id,
      short_url: ShortenedUrl.random_code,
      long_url: long_url
      )
  end

  def num_clicks
    visits.count
  end

  def num_uniques
    distinct_visitors.count
  end

  def num_recent_uniques
    visits.where("created_at > ?", 10.minutes.ago)
      .select(:visitor_id).distinct.count
  end

  # private

  # def only_five_per_min
  #   if you meet some bad condition
  #     errors.add(:submitter_id, "has created too many short urls in the past minute")
  #   end
  # end
end
