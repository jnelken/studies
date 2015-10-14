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
  validates :submitter_id, presence: true
  validates :short_url, presence: true, uniqueness: true
  validates :long_url, presence: true

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
    visitors.distinct.count
  end
end
