# Teaser
# Wordpress style teaser text.
# 1. Takes the text before the <!--more--> comment in an article and returns it.
# 2. Replaces teh <!--more--> comment with a continue link.
#
# @Usage: <p>{{ page.content | teaser: page.url }}</p>


module Jekyll
  module TeaserFilter
    def teaser(input, url)
      # Describe the pattern to match
      regEx = %r{<!--more(?<read_more_message> ...*)?-->}
      placeholder = input.match regEx

      # If no placeholder, return the full text
      if placeholder.nil?
        input
      elsif placeholder[:read_more_message].nil?
        %|#{input.split(placeholder[0]).first.strip}<p><a href="#{url}">Continue reading &#8594;</a></p>|
      else
        %|#{input.split(placeholder[0]).first.strip}<p><a href="#{url}">#{placeholder[:read_more_message].strip}</a></p>|
      end
    end

  end
end

Liquid::Template.register_filter(Jekyll::TeaserFilter)