# avs-downloader

simple userscript providing barebone anime downloader for animevietsub

# notice (? lol)

script not working bc of recent massive rehaul of the codebase
see [fetch.md](/fetch.md) for more info

# some backstories

i made this bc previously i created a python script for downloading anime
from the website that doesn't work very well bc of the strict cloudflare protection.
somehow when playing with the script and adding parallel downloading i got blocked
from the site for 1 week (lol).

bc of that i got pretty scared anyways so i decided to create this instead which
solves all the problems but makes mass downloading harder.

# notes

i have only tested this 1 time, but yeah it works. at first i was scared that they
would have block me again because of the unusual traffic but fuck yeah it works lol
i did not get block.

# tasks

- [ ] parse the html page and manually get the m3u8 playlist instead of relying on jwplayer
- [ ] ranged chunks download
- [ ] parallel fetching (might be blocked idk)
