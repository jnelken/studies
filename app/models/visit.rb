# == Schema Information
#
# Table name: visits
#
#  id           :integer          not null, primary key
#  visitor_id   :integer
#  short_url_id :integer
#  created_at   :datetime
#  updated_at   :datetime
#

class Visit < ActiveRecord::Base
  validates :short_url_id, presence: true
  validates :visitor_id, presence: true

  def self.record_visit!(user, shortened_url)
    Visit.new(visitor_id: user.id, short_url_id: shortened_url.id)
  end
end
