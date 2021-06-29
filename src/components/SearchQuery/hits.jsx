import React from 'react';
import PropTypes from 'prop-types';
import { connectHits, Highlight } from 'react-instantsearch-dom';

const Hits = ({ hits }) => (
  <dl className="hit-list">
    {hits.map(hit => (
      <div>
        {hit.last_name ?
          <dt>
            <strong>Contributor: </strong>
            <Highlight attribute="first_name" hit={hit} /> <Highlight attribute="last_name" hit={hit} />
          </dt>
          : ''
        }
        <dd>
          <strong>Election: </strong>
          <a href={`/election/${hit.election_location.toLowerCase()}/${hit.election_date}`} target="_blank" rel="noreferrer" >
            <Highlight attribute="election_title" hit={hit} />
          </a>
        </dd>
        {hit.committee_name ?
          <dd>
            <strong>Committee: </strong>
            <a href={`/committee/${hit.committee_id}`} target="_blank" rel="noreferrer" >
              <Highlight attribute="committee_name" hit={hit} />
            </a>
          </dd>
          : ''
        }
        {hit.title ?
          <dd>
            {hit.supporting ?
              <strong><Highlight attribute="supporting" hit={hit} /> </strong>
              : ''
            }
            {hit.measure ? <strong><Highlight attribute="measure" hit={hit} /> -  </strong>
              : <strong>Ballot Measure: </strong>
            }
            <a href={`/referendum/${hit.election_location.toLowerCase()}/${hit.election_date}/${hit.slug}`} target="_blank" rel="noreferrer" >
              <Highlight attribute="title" hit={hit} />
            </a>
          </dd>
          : ''
        }
        {hit.office_title ?
          <dd>
            <strong>Office: </strong>
            <a href={`/office/${hit.election_location.toLowerCase()}/${hit.election_date}/${hit.office_slug}`} target="_blank" rel="noreferrer" >
              <Highlight attribute="office_title" hit={hit} />
            </a>
          </dd> : ''
        }
        {hit.name ?
          <dd>
            {hit.supporting ?
              <strong><Highlight attribute="supporting" hit={hit} /> </strong>
              : ''
            }
            <strong>Candidate: </strong>
            <a href={`/candidate/${hit.election_location.toLowerCase()}/${hit.election_date}/${hit.candidate_slug}`} target="_blank" rel="noreferrer" >
              <Highlight attribute="name" hit={hit} />
            </a>
          </dd>
          : ''
        }
        {hit.amount ?
          <dd>
            <strong>Amount:</strong> $<Highlight attribute="amount" hit={hit} />
          </dd>
          : ''}
        <dd> <strong>Election date:</strong> <Highlight attribute="election_date" hit={hit} /> </dd>
        <dd> <strong>Location:</strong> <Highlight attribute="election_location" hit={hit} /> </dd>
        <hr />
      </div>
    ))}
  </dl>
);

const CustomHits = connectHits(Hits);
export default CustomHits;

Hits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.string,
    last_name: PropTypes.string,
    first_name: PropTypes.string,
    election_title: PropTypes.string,
    election_location: PropTypes.string,
    election_date: PropTypes.string,
    name: PropTypes.string,
    committee_name: PropTypes.string,
    committee_id: PropTypes.string,
    supporting: PropTypes.string,
    measure: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number,
    slug: PropTypes.string,
    candidate_slug: PropTypes.string,
    office_slug: PropTypes.string,
    office_title: PropTypes.string,
  })),
};

Hits.defaultProps = {
  hits: [],
};
