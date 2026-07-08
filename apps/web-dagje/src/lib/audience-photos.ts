/**
 * Sfeerfoto's per doelgroep. Via loremflickr (CC-BY Flickr), tags matchen de activiteit.
 * lock=<slug> zorgt dat de foto vast blijft per doelgroep (niet bij elke refresh anders).
 *
 * Ger vervangt deze later door eigen fotografie via admin-upload.
 */

import type { AudienceSlug } from './audiences';

export const AUDIENCE_PHOTOS: Record<AudienceSlug, string> = {
  teamuitje: 'https://loremflickr.com/800/600/paddleboarding,friends/all?lock=team1',
  studenten: 'https://loremflickr.com/800/600/students,beer,pub/all?lock=stud1',
  schoolgroep: 'https://loremflickr.com/800/600/schoolchildren,museum,fieldtrip/all?lock=school1',
  gezin: 'https://loremflickr.com/800/600/family,pancakes,restaurant/all?lock=gezin1',
  vrijgezel: 'https://loremflickr.com/800/600/bachelorette,party,friends/all?lock=vrij1',
};
